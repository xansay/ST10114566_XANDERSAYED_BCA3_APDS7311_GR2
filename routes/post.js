// Import necessary modules and dependencies
const router = require('express').Router();
const { Post, validatePost } = require('../models/post');
const auth = require('../middleware/auth');

// Handle GET request to retrieve all posts
router.get('/', async (req, res) => {
    // Fetch all posts from the database
    const posts = await Post.find();
    // Send the retrieved posts in the response
    res.send(posts);
});

// Handle POST request to create a new post
router.post('/', async (req, res) => {
    // Validate the incoming post data
    const { error } = validatePost(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Create a new post instance and save it to the database
    const post = new Post(req.body);
    post.save();

    // Send the newly created post in the response
    res.send(post);
});

// Handle GET request to retrieve a single post by its ID
router.get('/:id', async (req, res) => {
    // Find a post by its ID in the database
    const post = await Post.findById({ _id: req.params.id });
    if (post) return res.send(post);
    // If the post is not found, send a 404 status code
    res.sendStatus(404);
});

// Handle DELETE request to delete a single post by its ID
router.delete('/:id', async (req, res) => {
    // Delete a post by its ID in the database
    const result = await Post.deleteOne({ _id: req.params.id });
    // Send the result of the deletion in the response
    res.send(result);
});

// Export the router for use in other modules
module.exports = router;
