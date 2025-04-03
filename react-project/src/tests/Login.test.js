// src/__tests__/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Components/Login';

test('successful login updates the message', async () => {
  const mockApi = {
    login: jest.fn().mockResolvedValue({ message: 'Login successful' })
  };

  render(<Login api={mockApi} />);

  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user123' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });

  // Click login button
  fireEvent.click(screen.getByText(/Login/i));

  // Wait for API response
  expect(await screen.findByText('Login successful')).toBeInTheDocument();
});
