const express = require("express");
const multer = require("multer");
const path = require("path");
const Resume = require("../models/Resume");

const router = express.Router();

// 📂 Set up file storage
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// ✅ Upload Resume (Only Admin)
router.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        const { jobId, uploadedBy } = req.body;
        const newResume = new Resume({
            jobId,
            uploadedBy,
            fileUrl: `/uploads/${req.file.filename}`
        });

        await newResume.save();
        res.json(newResume);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get resumes for a job (For Alumni)
router.get("/:jobId", async (req, res) => {
    try {
        const resumes = await Resume.find({ jobId }).populate("uploadedBy", "name");
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Accept or Reject Resume (Only Alumni)
router.put("/:resumeId", async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const updatedResume = await Resume.findByIdAndUpdate(req.params.resumeId, { status }, { new: true });
        res.json(updatedResume);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
