// Import necessary modules and dependencies
const router = require('express').Router();
const { Post, validatePost } = require('../models/post');
const auth = require('../middleware/auth');

// This is the GET request that's gets all the posts
router.get('/', async (req, res) => {
    // Fetch all posts from the database
    const posts = await Post.find();
    // Send the retrieved posts in the response
    res.send(posts);
});

// This is the POST request that makes a single post
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

// This is the GET request that's GET a single post by its ID
router.get('/:id', async (req, res) => {
    // Find a post by its ID in the database
    const post = await Post.findById(req.params.id);
    if (post) return res.send(post);
    res.sendStatus(404);
});

// This is the DELETE request that's delete a single post by its ID
router.delete('/:id', async (req, res) => {
    const result = await Post.deleteOne({ _id: req.params.id });
    res.send(result);
});

// Export the router for use in other modules
module.exports = router;
