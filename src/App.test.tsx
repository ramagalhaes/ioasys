import React from 'react';
import { render, screen } from '@testing-library/react';
import Router from './router/Router';

test('#Renders Router link', () => {
  render(<Router />);
  const linkElement = screen.getByText('Router');
  expect(linkElement).toBeInTheDocument();
});
