import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign(
    {
      _id: id,
    },
    process.env.JWT_SECRET
  );
};

export const handleUserRegister = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    const userByName = await User.findOne({ userName });

    if (userByName) {
      return res.status(403).json({ message: "User Name already exist" });
    }

    const userByEmail = await User.findOne({ email });

    if (userByEmail) {
      return res.status(403).json({ message: "Email already exist" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      name,
      userName,
      email,
      password: hashPassword,
    });

    const token = createToken(user._id);
    res
      .status(201)
      .json({
        name: user.name,
        userName: user.userName,
        token,
        message: "Register Successfully",
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isMatch = bcrypt.compareSync(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.status(200).json({
        name: user.name,
        userName: user.userName,
        token,
        message: "Login Successfully",
      });
    } else {
      res.status(403).json({ error: "Wrong email or password" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
