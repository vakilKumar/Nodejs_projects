const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../../models/userModel');

router.post('/signUp', async (req, res) => {
  console.log('===== req =======', req.body)
  const { username, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ $or: [{ password }, { email }] });
    console.log('=== existingUser ========', existingUser)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Failed to sign up' });
  }
});

module.exports = router;
