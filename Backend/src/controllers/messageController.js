const Message = require("../models/messageModel");

// Store message
const sendMessage = async (req, res) => {
    try {
        const { sender, text, department } = req.body;
        const newMessage = new Message({ sender, text, department });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
};

// Get messages by department
const getMessagesByDepartment = async (req, res) => {
    try {
        const { department } = req.params;
        const messages = await Message.find({ department }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

module.exports = { sendMessage, getMessagesByDepartment };
