import Message from "../model/messages.js";

export const handleUserMessages = async (req, res) => {
    const { userName } = req.user;

    try{
        const messages = await Message.find({ user: userName });
        res.json({messages, message: "Messages fetched successfully"})
    } catch(error){
        throw error;
    }
}



