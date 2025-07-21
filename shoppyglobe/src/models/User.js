const mongoose = require('mongoose');

// Define a new schema for users using mongoose
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);// This model will be used to interact with the "users" collection in MongoDB
