// Import necessary modules and libraries
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config({ path: './process.env' });
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const hsts = require('./middleware/hsts');
const mongoose = require('mongoose');

// Connect to MongoDB using the provided URL
mongoose.connect(process.env.MONGODB_URL).then(() => console.log('DB is connected...'));

// Set up middleware for security and parsing JSON
app.use(helmet());
app.use(cors({ origin: 'https://localhost:3000', optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(hsts);

// Additional CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});
// Define routes for authentication, user, and posts
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/posts', require('./routes/post'));

// Create an HTTPS server with SSL certificates
const server = https.createServer(
  {
    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem'),
    passphrase: 'Filmhear22',
  },
  app
);

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Export the Express app
module.exports = app;
