const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
    name: String,
email: String,
  college: String, // e.g., "VIT"
  batch: String,   // e.g., "2021"
  branch: String,  // e.g., "CSE"
});

const Alumni = mongoose.model("Alumni", alumniSchema);
module.exports = Alumni;
