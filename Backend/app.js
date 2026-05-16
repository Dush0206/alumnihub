const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const router = require("./src/routes");

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

// Routes
app.use("/", router);

const PORT = process.env.PORT || 4000;

// ✅ Improved MongoDB Connection
async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      // ✅ Added for better connection handling
      autoIndex: true, // ✅ Auto-indexing
    });

    console.log(`\n✅ MongoDB connected! HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("\n❌ MONGODB connection FAILED:", error.message);
    process.exit(1); // Exit process on failure
  }
}

const messageRoutes = require("./src/routes/messageRoutes");
app.use("/api/messages", messageRoutes);


connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});

module.exports = app;

