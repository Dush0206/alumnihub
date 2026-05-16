const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  applyLink: String,
  postedBy: String, // Alumni username
  resumes: [
    {
      adminUsername: String,
      resumeFile: String, // Store as base64 or file URL
      status: { type: String, enum: ["pending", "accepted"], default: "pending" },
    },
  ],
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
