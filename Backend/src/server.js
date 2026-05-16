const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const messageRoutes = require("./routes/messageRoutes");
const Message = require("./models/messageModel"); // ✅ Import Message model
const sendMailRoute = require("./routes/sendMail");
const jobRoutes = require("./routes/jobs"); // ✅ Import Job routes

const eventRoutes = require("./routes/eventRoutes");
app.use("/api/events", eventRoutes);


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Change if frontend is on a different port
        methods: ["GET", "POST"]
    }
});

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/api/messages", messageRoutes);
app.use("/api/jobs", jobRoutes); // ✅ Added Jobs API Route
app.use("/api", sendMailRoute);

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://brijeshmathimariappan1:Arjunnaga@brijesh.803uf.mongodb.net/?retryWrites=true&w=majority&appName=Brijesh", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Connection Failed:", err));

// ✅ Socket.io Connection
io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    socket.on("sendMessage", async (messageData) => {
        const { sender, text, department } = messageData; // ✅ Use "text" instead of "message"

        try {
            const newMessage = new Message({ sender, message: text, department }); // ✅ Fix message field
            await newMessage.save();

            io.emit("receiveMessage", newMessage); // ✅ Send new message to all clients
        } catch (error) {
            console.error("❌ Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});

// ✅ Start server
const PORT = 8080;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
