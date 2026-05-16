const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const Alumni = require("./models/alumni"); // Import Alumni Model

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://your_mongo_url", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    // Email Sender Route
    app.post("/api/sendMail", async (req, res) => {
    const { college, batch, branch, subject, message } = req.body;

    try {
        // Fetch emails of alumni matching the selected filters
        const alumni = await Alumni.find({ 
        college: { $in: college }, 
        batch: { $in: batch }, 
        branch: { $in: branch } 
        });

        if (alumni.length === 0) {
        return res.status(404).json({ message: "No alumni found!" });
        }

        const emailList = alumni.map((a) => a.email);

        // Set up email transporter
        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-app-password", // Use App Password
        },
        });

        // Email configuration
        const mailOptions = {
        from: "your-email@gmail.com",
        to: emailList.join(","), // Send to multiple emails
        subject,
        text: message,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.json({ message: `Emails sent successfully to ${emailList.length} alumni!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error sending email" });
    }
    });

    app.listen(8080, () => console.log("Server running on port 8080"));
