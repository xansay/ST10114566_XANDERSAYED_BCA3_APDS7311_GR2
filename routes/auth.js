// Import necessary modules and dependencies
const router = require('express').Router();
const ExpressBrute = require('express-brute');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { isValidPassword } = require('../utils/hash');
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

// Handle POST request for user authentication
router.post('/', async (req, res) => {
    // Find a user by their username in the database
    const user = await User.findOne({ username: req.body.username });
    // If the user does not exist, return a 403 error
    if (!user)
        return res.status(403).json({ error: 'Incorrect username or password.' });

    // Check if the provided password is valid
    const valid = await isValidPassword(req.body.password, user.password);

    // If the password is not valid, return a 403 error
    if (!valid)
        return res.status(403).json({ error: 'Incorrect username or password.' });

    // Generate a JWT token with the user's ID and sign it with the secret key
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    // Send the JWT token in the response
    res.json({ token });
});

// Export the router for use in other modules
module.exports = router;
