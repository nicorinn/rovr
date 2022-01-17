import { render, screen } from '../../test-utils';
import Header from './Header';

describe('<Header />', () => {
  test('renders the header title', () => {
    render(<Header />);
    const linkElement = screen.getByText(/rovr/i);
    expect(linkElement).toBeInTheDocument();
  });
});
