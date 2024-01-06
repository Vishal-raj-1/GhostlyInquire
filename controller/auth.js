import User from "../model/user.js"
import bcrypt from "bcrypt";

export const handleUserRegister = async (req, res) => {
    const { name, userName, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    try {
        const result = await User.create({ name, userName, email, password: hashPassword });
        res.json(result);
    } catch (error) {
        throw error;
    }
}

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const isMatch = bcrypt.compareSync(password, user.password);

        if (isMatch) {
            res.json(user);
        } else {
            res.json({ error: "Wrong email or password" });
        }
    } catch (error) {
        throw error;
    }

}

export const handleForgetPassword = async (req, res) => {
    const { email } = req.body;

    // call some service to send mail with random password (use nodemailer module)
}