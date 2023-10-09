const bcrypt = require('bcrypt');

// Function to hash a password asynchronously
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

// Function to check if a password matches a hashed version asynchronously
async function isValidPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, isValidPassword };
