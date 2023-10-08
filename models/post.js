const mongoose = require('mongoose');
const Joi = require('joi');

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    departmentCode: String,
    });

const Post = mongoose.model('Post', postSchema);

function validatePost(post)
{
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().max(50).required(),
        departmentCode: Joi.string().max(50).required(),
    });
    return schema.validate(post);
}

module.exports = {Post, validatePost};