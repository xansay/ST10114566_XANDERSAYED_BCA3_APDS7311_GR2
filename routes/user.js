// Import necessary modules and dependencies
const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const { hashPassword } = require('../utils/hash');
const auth = require('../middleware/auth');

// Handle POST request to create a new user
router.post('/', async (req, res) => {
    // Validate the incoming user data
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Check if the username is unique
    const isUnique = (await User.count({ username: req.body.username })) === 0;
    if (!isUnique)
        return res.status(400).json({error: 'The username or password is incorrect.'});

    try {
        // Create a new user instance and hash the password
        const user = new User(req.body);
        user.password = await hashPassword(user.password);
        await user.save();
    } catch (err) {
        // Handle any errors that occur during user creation
        return res
            .status(500)
            .json(err);
    }
    
    // Send a successful response with status code 201
    res.sendStatus(201);
});

// Handle GET request to retrieve the current user
router.get('/', async (req, res) => {
    // Send the current user information in the response
    res.send({currentUser: req.user});
});

// Export the router for use in other modules
module.exports = router;
