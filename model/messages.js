import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: "user"
    }
})

export default mongoose.model("message", messageSchema);