// routes/login.js

const express = require('express');
const router = express.Router();
const User = require('../model/user'); // Import your User model
const bcrypt = require('bcrypt');
const path = require('path')

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Store user information in the session
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: req.session.user,
    });
  } catch (error) {
    console.error('Error logging in user', error);
    res.status(500).json({ success: false, message: 'An error occurred while logging in the user' });
  }
});

router.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/login.html'))
})

module.exports = router;
