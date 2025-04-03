const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const users = [
  { username: 'john', password: 'password123' }, // Example user
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
});

module.exports = app;
