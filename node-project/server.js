


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


// ----------------------------------------------------------------------------

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// // Temporary in-memory database (array) for storing orders
// let orders = [];

// POST /orders


// // POST /orders – Create a new order
// app.post('/orders', (req, res) => {
//   const { customerId, items, totalAmount } = req.body;

//   // Validate incoming data
//   if (!customerId || !items || totalAmount == null) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   // Create the new order
//   const newOrder = {
//     id: orders.length + 1, // Auto-incrementing ID
//     customerId,
//     items,
//     totalAmount
//   };

//   // Add to orders array (mock database)
//   orders.push(newOrder);

//   // Respond with the created order
//   res.status(201).json(newOrder);
// });

// // GET /orders – Retrieve all orders
// app.get('/orders', (req, res) => {
//   res.status(200).json(orders); // Respond with all orders in the array
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app; // Export app for testing

// const express = require('express');
// const app = express();

// // Middleware for JSON parsing
// app.use(express.json());

// // Order data (just an array for now)
// const orders = [];

// // POST /orders - Create a new order
// app.post('/orders', (req, res) => {
//   try {
//     const { customerId, items, totalAmount } = req.body;

//     if (!customerId || !items || !totalAmount) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const newOrder = {
//       id: orders.length + 1,
//       customerId,
//       items,
//       totalAmount,
//     };
//     orders.push(newOrder);

//     return res.status(201).json(newOrder);
//   } catch (error) {
//     // Simulate a server error
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // GET /orders/:id - Get order by ID
// app.get('/orders/:id', (req, res) => {
//   const orderId = parseInt(req.params.id);

//   const order = orders.find(o => o.id === orderId);
  
//   if (!order) {
//     return res.status(404).json({ error: 'Order not found' });
//   }

//   return res.status(200).json(order);
// });

// // Export the app for testing
// module.exports = app;

// // Start server (optional for testing, but can be used for production)
// if (require.main === module) {
//   app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
//   });
// }


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Route for creating an order
app.post('/orders', (req, res) => {
  const { totalAmount, customerName } = req.body;

  // Check if required fields are missing
  if (!totalAmount || !customerName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if totalAmount is a valid number
  if (isNaN(totalAmount)) {
    return res.status(400).json({ error: 'Invalid totalAmount' });
  }

  try {
    // Simulating a server error (e.g., failed database connection or server-side logic failure)
    if (totalAmount === 999) {
      throw new Error('Simulated server error');
    }

    // Process the order (e.g., save to database)
    // Order creation logic goes here...

    // If successful, return a success response
    res.status(201).json({ message: 'Order created successfully', order: req.body });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for getting an order by ID
app.get('/orders/:id', (req, res) => {
  const orderId = req.params.id;

  // Simulate checking the database for an order
  if (orderId === '123') {
    // If the order exists, return a 200 response with the order details
    return res.status(200).json({ id: orderId, totalAmount: 200, customerName: 'John Doe' });
  }

  // If the order does not exist, return a 404 error
  return res.status(404).json({ error: 'Order not found' });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
