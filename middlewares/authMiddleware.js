import User from "../model/user.js";
import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        
        if (!authorization)
            return res.json({ message: "Un-Authorized" });

        const token = authorization.split(" ")[1];

        const { _id } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(_id);
        req.user = user;

    } catch (error) {
        throw error;
    }

    next();
}

export default AuthMiddleware;