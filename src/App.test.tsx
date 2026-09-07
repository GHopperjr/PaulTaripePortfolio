import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio owner name and tagline', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /paul gabriel taripe/i })).toBeInTheDocument();
  expect(screen.getByText(/cloud-native & full-stack developer/i)).toBeInTheDocument();
});

test('renders the project carousel with navigation controls', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /next project/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /previous project/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /go to gbcc logging system/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /go to hikecavite/i })).toBeInTheDocument();
});
