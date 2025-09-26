require("dotenv").config(); // at the very top of your entry file

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware to verify hashed password
async function verifyPassword(req, res, next) {
  const { password } = req.body;
  const hashedPassword = req.user; // Assume hashedPassword is attached to req.user after fetching user from DB
  if (!password || !hashedPassword) {
    return res
      .status(400)
      .json({ error: "Password and hashed password required." });
  }
  try {
    const match = await bcrypt.compare(
      String(password),
      String(hashedPassword)
    );
    if (!match) {
      return res.status(401).json({ error: "Invalid password." });
    }
    next();
  } catch (err) {
    console.log(err, "this is error");
    res.status(500).json({ error: "Password verification failed." });
  }
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token required." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token." });
    }
    req.user = decoded;
    next();
  });
}

function generateToken(req, res, next) {
  const token = jwt.sign(
    { id: req.user._id, userName: req.user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  req.token = token;
  next();
}

module.exports = {
  verifyPassword,
  verifyToken,
  generateToken,
};
