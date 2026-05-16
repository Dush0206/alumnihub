const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin who submitted
    fileUrl: String, // Store file path
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }
});

module.exports = mongoose.model("Resume", ResumeSchema);
