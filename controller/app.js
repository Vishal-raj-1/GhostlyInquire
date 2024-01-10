import Message from "../model/messages.js";

export const handleUserMessages = async (req, res) => {
  const { userName } = req.user;

  try {
    const messages = await Message.find({ user: userName });
    res.json({ messages, message: "Messages fetched successfully" });
  } catch (error) {
    res.status(400).json({error});
  }
};

export const handleGetUserDetails = async (req, res) => {
  try {
    const { name, userName } = req.user;
    res.status(200).json({ name, userName });
  } catch (error) {
    res.status(400).json({error});
  }
};
