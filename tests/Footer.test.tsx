import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../src/components/Footer';

describe('Footer Component', () => {
  it('renders copyright and footer links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/© 2025 Dating Red Flag Checker/i)).toBeInTheDocument();

    const privacyLink = screen.getByText('Privacy Policy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');

    const termsLink = screen.getByText('Terms of Use');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms-of-use');

    const githubLinks = screen.getAllByText('GitHub');
    expect(githubLinks.length).toBeGreaterThan(0);
    
    const hasCorrectLink = githubLinks.some(link => 
      link.closest('a')?.getAttribute('href') === 'https://github.com/duriantaco/check-red-flag'
    );
    expect(hasCorrectLink).toBe(true);
  });
});