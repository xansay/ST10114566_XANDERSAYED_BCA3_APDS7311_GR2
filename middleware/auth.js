// Import the 'jsonwebtoken' library for handling JWTs
const jwt = require('jsonwebtoken');

// Middleware function for authentication using JWT
function auth(req, res, next){
    // Get the JWT token from the 'x-auth-token' header in the request
    const token = req.header('x-auth-token');
    let id;

    try {
        // Verify the token using the 'JWT_SECRET_KEY' from environment variables
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        id = userId;
    } catch (err) {
        // If token verification fails, return a 401 Unauthorized status
        return res.sendStatus(401);
    }

    // If token is valid, set the user ID in the request object and proceed to the next middleware
    if (id) {
        req.user = { id };
        return next();
    }

    // If no valid user ID is found, return a 401 Unauthorized status
    res.sendStatus(401);
}

// Export the 'auth' middleware for use in other parts of the application
module.exports = auth;
