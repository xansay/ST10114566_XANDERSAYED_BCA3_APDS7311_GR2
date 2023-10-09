// Import necessary libraries
const mongoose = require('mongoose');
const Joi = require('joi');

// Define the schema for the 'Post' model
const postSchema = new mongoose.Schema({
    title: String,               // Title of the post
    description: String,        // Description of the post
    departmentCode: String,     // Code representing the department
});

// Create the 'Post' model based on the schema
const Post = mongoose.model('Post', postSchema);

// Function to validate a 'post' object using Joi schema validation
function validatePost(post) {
    // Define a Joi schema for the expected structure of the 'post' object
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),      // Title is required, min 3 and max 50 characters
        description: Joi.string().max(50).required(),      // Description is required, max 50 characters
        departmentCode: Joi.string().max(50).required(),   // Department code is required, max 50 characters
    });
    
    // Validate the 'post' object against the defined schema
    return schema.validate(post);
}

// Export the 'Post' model and the 'validatePost' function for use in other parts of the application
module.exports = { Post, validatePost };
