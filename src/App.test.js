import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Currency Converter heading', () => {
  render(<App />);
  const headerElement = screen.getByText(/'Currency Converter'/i);
  expect(headerElement).toBeInTheDocument();
});
