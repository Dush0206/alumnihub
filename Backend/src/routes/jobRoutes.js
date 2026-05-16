const express = require("express");
const router = express.Router();
const Job = require("../models/job");


router.post("/post", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Error posting job", error });
  }
});


router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});


router.post("/upload-resume/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { adminUsername, resumeFile } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.resumes.push({ adminUsername, resumeFile, status: "pending" });
    await job.save();

    res.json({ message: "Resume uploaded", job });
  } catch (error) {
    res.status(500).json({ message: "Error uploading resume", error });
  }
});


router.put("/accept-resume/:jobId/:resumeIndex", async (req, res) => {
  try {
    const { jobId, resumeIndex } = req.params;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.resumes[resumeIndex].status = "accepted";
    await job.save();

    res.json({ message: "Resume accepted", job });
  } catch (error) {
    res.status(500).json({ message: "Error accepting resume", error });
  }
});


router.delete("/delete-resume/:jobId/:resumeIndex", async (req, res) => {
  try {
    const { jobId, resumeIndex } = req.params;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.resumes.splice(resumeIndex, 1);
    await job.save();

    res.json({ message: "Resume deleted", job });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resume", error });
  }
});

module.exports = router;
