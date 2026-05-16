const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  department: { type: String, required: true }, // Department like CSE, CSBS, etc.
  sender: { type: String, required: true }, // Who sent the message
  message: { type: String, required: true }, // Message content
  timestamp: { type: Date, default: Date.now } // Time of message
});

module.exports = mongoose.model("Message", messageSchema);
