const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hash, compare } = require('../utils/hash');

const router = express.Router();

// Handle user registration requests
router.post('/register', async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });// If either email or password is missing, send a 400 Bad Request response

  const exists = await User.findOne({ email });// Check if a user with the given email already exists in the database
  if (exists) return res.status(400).json({ error: 'Email taken' });// If the email is already taken, return an error response

  const hashed = await hash(password); // Hash the password securely before saving it to the database
  const user = await User.create({ email, password: hashed });  // Create a new user in the database with the hashed password
  res.status(201).json({ id: user._id, email: user.email });// Respond with the new user's ID and email (but NOT the password)
});

// Handle user login requests
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body
  const user = await User.findOne({ email });  // Find the user with the given email in the database
  if (!user || !(await compare(password, user.password)))  // If no user is found or the password does not match, return error
    return res.status(400).json({ error: 'Invalid credentials' }); 

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Generate a JWT token that includes the user's ID
  res.json({ token });  // Send the token back in the response so the user can authenticate future requests
});

module.exports = router;
