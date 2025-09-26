require("dotenv").config(); // at the very top of your entry file
const express = require("express");
const router = express.Router();
const User = require("../../DB/User");
const bcrypt = require("bcrypt");
const { verifyPassword } = require("../../middleware/index");

// Example: GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // fetch all users from MongoDB
    if (users.length) res.status(200).json(users);
    if (!users.length) {
      return res.status(200).json({ message: "no users found" });
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Example: Post /api/users
router.post(
  "/login",
  async (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
      res.status(401).json({ message: "Invalid Credentails" });
    }
    const user = await User.findOne({ userName });

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = user?.password;

    req.user = hashedPassword; // attach user to req
    next();
  },
  verifyPassword,
  (req, res) => {
    // If we reach here, password is valid
    res.status(200).json({ message: "Login successful", user: res.user });
  }
);

// Example: POST /api/users
router.post("/create-user", async (req, res) => {
  const { userName, password } = req.body; // expects JSON { name: "Charlie" }
  try {
    // Generate a 2-digit string ID
    const randomID = String(Math.floor(Math.random() * 100)).padStart(2, "0");
    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      return res.status(409).json({ message: "UserName already Exisis" });
    }
    // Hash the password
    const saltRounds = Number(process.env.saltRounds); // number of salt rounds (standard)
    const hashedPassword = await bcrypt.hash(String(password), saltRounds);

    // Save user with hashed password
    const newUser = await User.create({
      ID: randomID,
      userName,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created", Data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
