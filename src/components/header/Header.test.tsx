import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('<Header />', () => {
  test('renders the header title', () => {
    render(<Header />);
    const linkElement = screen.getByText(/rovr/i);
    expect(linkElement).toBeInTheDocument();
  });
});
