import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: [true, 'userName already exists']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'email already exists']
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
    }, 
})

export default mongoose.model("user", userSchema);