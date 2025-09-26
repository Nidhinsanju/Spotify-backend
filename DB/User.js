const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ID: Number,
  userName: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
