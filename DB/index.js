// db.js
const mongoose = require("mongoose");
require("dotenv").config(); // load .env variables

const MONGO_URI = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "Spotify",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
