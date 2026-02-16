const mongoose = require("mongoose");

require("dotenv").config();

let cachedConnection = null;

async function CreateServer() {
  const URI = process.env.MONGODB_URI;

  // Return if already connected
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("✅ Using cached MongoDB connection");
    return;
  }

  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(URI);
    cachedConnection = mongoose.connection;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
}

module.exports = { CreateServer };
