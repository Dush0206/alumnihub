const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");

// ➤ POST: Save a new message
router.post("/", async (req, res) => {
    try {
        const { department, sender, message } = req.body;
        if (!department || !sender || !message) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newMessage = new Message({ department, sender, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ➤ GET: Fetch messages for a specific department
router.get("/:department", async (req, res) => {
    try {
        const messages = await Message.find({ department: req.params.department }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
