// routes/protected.js

const express = require('express');
const router = express.Router();

// Middleware to require authentication
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
  next();
};

// Protected route
router.get('/protected', requireAuth, (req, res) => {
  // This route is protected, and only authenticated users can access it
  res.status(200).json({
    success: true,
    message: 'Protected route',
    user: req.session.user,
  });
});

module.exports = router;
