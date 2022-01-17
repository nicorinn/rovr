import { render, screen } from '../../test-utils';
import Header from './Header';

describe('<Header />', () => {
  test('renders the header title', () => {
    render(<Header />);
    screen.getByRole('heading', { name: /rovr/i });
  });
});
