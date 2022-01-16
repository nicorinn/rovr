import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page', () => {
  render(<App />);
  const linkElement = screen.getByText(/rovr/i);
  expect(linkElement).toBeInTheDocument();
});
