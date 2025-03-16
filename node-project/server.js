


const express = require('express');
const app = express();

// Dummy data for users
const users = [
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' }
];

// Define the /users endpoint
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

module.exports = app;  // Export the app for testing
