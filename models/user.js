// Import necessary modules and dependencies
const mongoose = require('mongoose');
const Joi = require('joi');

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema (
    {
        username : {type: String, unique:true},
        firstName : String,
        lastName : String,
        password : String
    }
);

// Create a User model based on the schema
const User = mongoose.model('users', userSchema);

// Define a validation schema for user data using Joi
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(8).max(30).required()
    });
    return schema.validate(user);
}

// Export the User model and validation function for use in other modules
module.exports = {User, validateUser};
