const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Create user
router.post("/register", async (req, res) => {
  const { username, email, password, status } = req.body;

  try {
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username, email, password: hashedPassword, status
    });

    res.status(201).json(newUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect credentials" });
    }

    // Sign the JWT token
    const token = jwt.sign(
      { id: user.id, status: user.status },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the response with token and user info
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        status: user.status,
        created_at: user.created_at,
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
