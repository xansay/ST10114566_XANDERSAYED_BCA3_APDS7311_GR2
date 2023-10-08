// Import the necessary JWT library for authentication
const jwt = require('jsonwebtoken');

// Define an authentication middleware function for verifying JWT tokens
function authenticateToken(req, res, next) {
  // Extract the token from the 'Authorization' header, if it exists
  const token = req.header('Authorization')?.split('Bearer ')[1];

  try {
    // Check if a token exists
    if (token) {
      // Verify the token using the JWT_SECRET_KEY
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      // If verification is successful, move to the next middleware or route handler
      return next();
    } else {
      // If no token is found, return a 403 Forbidden response
      return res.sendStatus(403);
    }
  } catch (err) {
    // If an error occurs during token verification, return a 403 Forbidden response
    return res.sendStatus(403);
  }
}

// Export the authenticateToken middleware function for use in other modules
module.exports = authenticateToken;