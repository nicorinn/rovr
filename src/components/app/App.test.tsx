import React from 'react';
import { render, screen } from '../../test-utils';
import App from './App';

test('renders the home page', () => {
  render(<App />);
  screen.getByText(/rovr/i);
});
