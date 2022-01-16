import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageCard from './ImageCard';

describe('<ImageCard />', () => {
  test('displays caption', () => {
    render(<ImageCard url="" caption="test caption" />);
    screen.getByText(/test caption/i);
  });

  test('displays alt text', () => {
    render(<ImageCard url="" caption="test caption" alt="test alt" />);
    screen.getByAltText(/test alt/i);
  });
});
