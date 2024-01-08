import User from "../model/user.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
    return jwt.sign({
        _id: id
    }, process.env.JWT_SECRET)
}

export const handleUserRegister = async (req, res) => {
    const { name, userName, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    try {
        const user = await User.create({ name, userName, email, password: hashPassword });
        const token = createToken(result._id);
        res.json({ user, token, message: "Register Successfully" });
    } catch (error) {
        throw error;
    }
}

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const isMatch = bcrypt.compareSync(password, user.password);
        const token = createToken(user._id);

        if (isMatch) {
            res.json({user, token, message: "Login Successfully"});
        } else {
            res.json({ error: "Wrong email or password" });
        }
    } catch (error) {
        throw error;
    }

}