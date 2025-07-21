const mongoose = require('mongoose'); // Import the mongoose library to interact with MongoDB

const MONGODB_URI = 'mongodb://localhost:27017/shoppyglobe'; //// Define the MongoDB connection string (local MongoDB instance, database named 'shoppyglobe')

mongoose.connect(MONGODB_URI, { // Connect to MongoDB using the specified URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log('MongoDB connected'));// When the connection is successfully established, log a success message
mongoose.connection.on('error', err => console.error('Error while connecting:', err));// When there is an error during connection, log the error message
