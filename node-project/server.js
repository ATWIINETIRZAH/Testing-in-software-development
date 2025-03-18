


// // const express = require('express');
// // const app = express();

// // // Dummy data for users
// // const users = [
// //   { name: 'John Doe', email: 'john.doe@example.com' },
// //   { name: 'Jane Smith', email: 'jane.smith@example.com' }
// // ];

// // // Define the /users endpoint
// // app.get('/users', (req, res) => {
// //   res.status(200).json(users);
// // });

// // module.exports = app;  // Export the app for testing

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// // Temporary in-memory database (array) for storing orders
// let orders = [];

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app; // Export app for testing

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Temporary in-memory database (array) for storing orders
let orders = [];

// POST /orders – Create a new order
app.post('/orders', (req, res) => {
  const { customerId, items, totalAmount } = req.body;

  // Validate incoming data
  if (!customerId || !items || totalAmount == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create the new order
  const newOrder = {
    id: orders.length + 1, // Auto-incrementing ID
    customerId,
    items,
    totalAmount
  };

  // Add to orders array (mock database)
  orders.push(newOrder);

  // Respond with the created order
  res.status(201).json(newOrder);
});

// GET /orders – Retrieve all orders
app.get('/orders', (req, res) => {
  res.status(200).json(orders); // Respond with all orders in the array
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export app for testing
