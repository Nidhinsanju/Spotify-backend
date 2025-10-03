const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ID: Number,
  userName: String,
  password: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);
