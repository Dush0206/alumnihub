const Event = require("../models/");

const createEventController = async (req, res) => {
    try {
        const { title, date, location, category, description, organizer } = req.body;

        // Validation
        if (!title || !date || !location || !category || !description || !organizer) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create new event
        const newEvent = new Event({ title, date, location, category, description, organizer });
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllEventsController = async (req, res) => {
  try {
      const today = new Date();
      const upcomingEvents = await Event.find({ date: { $gte: today } }); // Future events
      const pastEvents = await Event.find({ date: { $lt: today } }); // Past events

      res.status(200).json({ upcomingEvents, pastEvents });
  } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createEventController, getAllEventsController };
