require("dotenv").config();
const mongoose = require("mongoose");
const Message = require("./src/models/messageModel");

// ✅ Connect to MongoDB Atlas
async function testDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connected to MongoDB Atlas");

        // ✅ Insert a test message
        const testMessage = new Message({
            department: "CSE",
            sender: "Test User",
            text: "This is a test message"
        });

        await testMessage.save();
        console.log("✅ Test message saved!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ MongoDB error:", error.message);
    }
}

testDB();
