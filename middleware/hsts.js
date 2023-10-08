// Define HTTP Strict Transport Security (HSTS) middleware function
function hsts(req, res, next) {
    // Check if the request is secure (using HTTPS)
    if (req.secure) {
        // Set the Strict-Transport-Security header with HSTS directives
        res.setHeader(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
        );
    }
    // Move to the next middleware or route handler
    next();
}

// Export the HSTS middleware function for use in other modules
module.exports = hsts;
