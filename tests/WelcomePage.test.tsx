import React from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import WelcomePage from '../src/pages/WelcomePage';

Object.defineProperty(window, 'location', {
  value: {
    pathname: '/',
    search: '',
    hash: '',
    origin: 'http://localhost',
    href: 'http://localhost/',
    protocol: 'http:',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  },
  writable: true
});

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, className, ...rest }) => (
    <a href={to} className={className} {...rest} data-testid="mock-link">
      {children}
    </a>
  ),
  useLocation: () => ({
    pathname: '/'
  }),
  useNavigate: () => vi.fn(),
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

vi.mock('lucide-react', () => ({
  Heart: ({ size, className }) => <div data-testid="mock-heart" className={className} data-size={size} />,
  ArrowRight: () => <div data-testid="mock-arrow-right" />,
  ArrowUpRight: () => <div data-testid="mock-arrow-up-right" />,
  Github: () => <div data-testid="mock-github" />,
}));

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid="mock-helmet">{children}</div>,
  HelmetProvider: ({ children }) => <div data-testid="mock-helmet-provider">{children}</div>,
}));

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal() as object;
  return {
    ...actual,
    useRef: () => ({ current: { style: {} } }),
    useEffect: (fn) => fn(),
  };
});

describe('WelcomePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    document.querySelectorAll = vi.fn().mockReturnValue([]);
    window.addEventListener = vi.fn();
    window.removeEventListener = vi.fn();
  });

  it('renders basic elements', () => {
    render(<WelcomePage />);

    const headingElement = screen.getAllByText(/Dating/).find(
      el => el.tagName.toLowerCase() === 'span' && el.className.includes('text-white')
    );
    expect(headingElement).toBeInTheDocument();
    
    expect(screen.getByText(/Red Flag/, { selector: 'span.bg-clip-text' })).toBeInTheDocument();
    
    expect(screen.getByText(/Checker/, { selector: 'span.text-white' })).toBeInTheDocument();
    
    expect(screen.getByText(/Identify relationship warning signs/)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<WelcomePage />);
    
    const links = screen.getAllByTestId('mock-link');
    const linkTexts = links.map(link => link.textContent);
    const linkHrefs = links.map(link => link.getAttribute('href'));
    
    expect(linkTexts).toContain('Learn More');
    expect(linkTexts).toContain('Get Started');
    expect(linkHrefs).toContain('/about');
    expect(linkHrefs).toContain('/quiz');
  });

  it('renders GitHub link with attributes', () => {
    render(<WelcomePage />);
    
    const githubLinks = screen.getAllByText('View on GitHub');
    expect(githubLinks.length).toBeGreaterThan(0);
    
    const link = githubLinks[0].closest('a');
    expect(link).toHaveAttribute('href', expect.stringContaining('github.com'));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});