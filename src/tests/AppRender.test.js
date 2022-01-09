import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders title', () => {
  render(<App />);
  const title = screen.getByText(/GitHüb/i);
  expect(title).toBeInTheDocument();
});

test('renders user search input', () => {
  render(<App />);
  const userInput = screen.getByPlaceholderText(/Enter name of user/i);
  expect(userInput).toBeInTheDocument();
})

test('renders user search button', () => {
  render(<App />);
  const userButton = screen.getByText(/Search for User/i);
  expect(userButton).toBeInTheDocument();
})

test('renders repository search input', () => {
  render(<App />);
  const repoInput = screen.getAllByPlaceholderText(/Search for repository/i);
  expect(repoInput).toBeInstanceOf(Array);
  expect(repoInput.length).toEqual(2);
})