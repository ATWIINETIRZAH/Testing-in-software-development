// src/__tests__/Login.test.js
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import Login from '../Components/Login';

// test('successful login updates the message', async () => {
//   const mockApi = {
//     login: jest.fn().mockResolvedValue({ message: 'Login successful' })
//   };

//   render(<Login api={mockApi} />);

//   // Simulate user input
//   fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user123' } });
//   fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });

//   // Click login button
//   fireEvent.click(screen.getByText(/Login/i));

//   // Wait for API response
//   expect(await screen.findByText('Login successful')).toBeInTheDocument();
// });


// ---------------------

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Components/Login';

test('renders login form with inputs and button', () => {
  render(<Login />);
  
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

test('shows validation error when fields are empty', () => {
  render(<Login />);
  
  fireEvent.click(screen.getByText(/Login/i)); // Click login without filling fields

  expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();
});

test('submits form when valid data is provided', () => {
  render(<Login />);

  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testUser' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText(/Login/i));

  expect(screen.queryByText(/All fields are required/i)).not.toBeInTheDocument(); // Error should disappear
});
