const express = require("express");
const router = express.Router();
const Event = require("../models/eventModel");

// ✅ Route to fetch all events
router.get("/all", async (req, res) => {
    try {
        const events = await Event.find();
        res.json({ events });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// ✅ Route to create an event (only alumni)
router.post("/create", async (req, res) => {
    try {
        const { title, date, location, category, description, organizer, createdBy } = req.body;
        const newEvent = new Event({ title, date, location, category, description, organizer, createdBy });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to create event" });
    }
});

module.exports = router;

