import Message from "../model/messages.js"

export const handlePostMessages = async (req, res) => {
    const { id } = req.params;

    try{
        await Message.create({ sender: req.socket.remoteAddress, user: id, message: req.body.message});
        res.json({message: "Message sent to user successfully"})
    } catch(error){
        throw error;
    }
}

