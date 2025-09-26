// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000; // you can change the port
const usersRouter = require("./routes/user/user");
const connectDB = require("./DB/index");
require("dotenv").config(); // add this at the very top

// Middleware to parse JSON
app.use(express.json());

connectDB();
// Mount routes
app.use("/api/users", usersRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Node.js server!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
