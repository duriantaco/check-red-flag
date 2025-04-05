import React from 'react';
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AboutPage from '../src/pages/AboutPage';

const originalUseEffect = React.useEffect;
vi.spyOn(React, 'useEffect').mockImplementation((effect, deps) => {
  if (deps && deps.includes('activeTab')) {
    return;
  }
  return originalUseEffect(effect, deps);
});

vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useSearchParams: () => [{ get: () => null }, vi.fn()]
}));

vi.mock('react-helmet-async', () => ({
  Helmet: () => null
}));

vi.mock('../ishearedflag/src/components/Header', () => ({
  default: () => <header>Header</header>
}));

vi.mock('../ishearedflag/src/components/Footer', () => ({
  default: () => <footer>Footer</footer>
}));

vi.mock('lucide-react', () => {
  const icons = {};
  ['Heart', 'Info', 'AlertTriangle', 'CheckCircle', 'ArrowRight', 
   'MessageSquare', 'Mail', 'Github', 'Coffee', 'ExternalLink'].forEach(icon => {
    icons[icon] = () => <span>{icon}</span>;
  });
  return icons;
});

document.head.appendChild = vi.fn();
document.head.removeChild = vi.fn();

global.URL = URL;

describe('AboutPage Tests', () => {
  it('renders without crashing', () => {
    render(<AboutPage />);
    expect(document.body.textContent).toContain('Dating Red Flag Checker');
  });
});