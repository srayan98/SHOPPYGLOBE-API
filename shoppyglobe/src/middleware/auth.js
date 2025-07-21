const jwt = require('jsonwebtoken');// Import the 'jsonwebtoken' package to work with JWTs (JSON Web Tokens)

// Verify JWT token
module.exports = (req, res, next) => {// Export a middleware function to verify JWT tokens
  try {
    const header = req.headers.authorization || ''; // Get the Authorization header from the incoming request
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);// Verify the token using the secret key stored in environment variable JWT_SECRET
    req.userId = decoded.id; // Store the user ID in the request object for later use
    next(); // Call next() to pass control to the next middleware or route handler
  } catch {
    res.status(401).json({ error: 'Unauthorized' });//Error message
  }
};
