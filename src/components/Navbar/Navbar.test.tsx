import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Navbar } from './Navbar';
import { describe, expect, test } from 'vitest';

describe('Navbar Component', () => {
  test('renders Home link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('has a navigation role', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const nav = screen.getByRole('navigation', { name: /main navigation/i });

    expect(nav).toBeInTheDocument();
  });
});
