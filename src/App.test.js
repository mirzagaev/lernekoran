import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn koran h1', () => {
  render(<App />);
  const linkElement = screen.getByText(/lerne koran/i);
  expect(linkElement).toBeInTheDocument();
});
