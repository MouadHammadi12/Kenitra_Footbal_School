import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard brand name', () => {
  render(<App />);
  expect(screen.getAllByText(/kenitra football school/i)[0]).toBeInTheDocument();
});
