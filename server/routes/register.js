// routes/register.js

const express = require('express');
const router = express.Router();
const User = require('../model/user'); // Import your User model
const bcrypt = require('bcrypt');
const path  = require('path');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Store user information in the session
    req.session.user = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(200).json({
      success: true,
      message: 'Registration successful',
      user: req.session.user,
    });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ success: false, message: 'An error occurred while registering the user' });
  }
});

router.get('/register', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/register.html'))
})

module.exports = router;
