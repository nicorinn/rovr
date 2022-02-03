import { render, screen } from '../../test-utils';
import Header from './Header';

describe('<Header />', () => {
  render(<Header />);

  test('renders the header title', () => {
    screen.getByRole('heading', { name: /rovr/i });
  });

  test('renders the latest images link', () => {
    render(<Header />);
    screen.getByRole('button', {
      name: /latest images/i,
    });
  });

  test('renders the globe link', () => {
    render(<Header />);
    screen.getByRole('button', {
      name: /3d globe/i,
    });
  });

  test('renders the about link', () => {
    render(<Header />);
    screen.getByRole('button', {
      name: /about/i,
    });
  });
});
