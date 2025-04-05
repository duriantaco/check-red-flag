import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdvicePage from '../src/pages/AdvicePage';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('react-helmet-async', () => ({
  Helmet: vi.fn(({ children }) => (
    <div data-testid="helmet-mock">{children}</div>
  )),
  HelmetProvider: ({ children }) => <div>{children}</div>,
}));

vi.mock('../ishearedflag/src/components/Header', () => ({
  default: vi.fn(() => <div data-testid="mock-header" />)
}));

vi.mock('../ishearedflag/src/components/Footer', () => ({
  default: vi.fn(() => <div data-testid="mock-footer" />)
}));

vi.mock('lucide-react', async () => {
  const createIconMock = (name) => vi.fn(() => <div data-testid={`mock-${name.toLowerCase()}-icon`} />);
  return {
    Book: createIconMock('book'),
    Coffee: createIconMock('coffee'),
    UserRound: createIconMock('user'),
    Users: createIconMock('users'),
    Heart: createIconMock('heart'),
    AlertTriangle: createIconMock('alert'),
    ArrowRight: createIconMock('arrow'),
    Dumbbell: createIconMock('dumbbell'),
    Info: createIconMock('info'),
    Github: createIconMock('github'),
    Twitter: createIconMock('twitter'),
    Mail: createIconMock('mail'),
    Menu: createIconMock('menu'),
    X: createIconMock('x'),
    Home: createIconMock('home'),
    Settings: createIconMock('settings'),
    User: createIconMock('user'),
    Flag: createIconMock('flag'),
    MessageSquare: createIconMock('message-square'),
    ChevronDown: createIconMock('chevron-down'),
    ChevronUp: createIconMock('chevron-up'),
    Check: createIconMock('check'),
    ExternalLink: createIconMock('external-link')
  };
});

const renderWithHelmet = (ui) => {
  const helmetContext = {};
  const rendered = render(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </HelmetProvider>
  );
  return {
    ...rendered,
    helmetContext
  };
};

describe('AdvicePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.head.appendChild = vi.fn();
    document.head.removeChild = vi.fn();
  });

  it('renders the component with default tab (dating)', () => {
    renderWithHelmet(<AdvicePage />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByText('Dating Etiquette: A Satirical Handbook')).toBeInTheDocument();
    expect(screen.getByText('First Date Essentials')).toBeInTheDocument();
    expect(screen.getByText('Texting Tactics')).toBeInTheDocument();
  });

  it('switches to breakup tab when breakup button is clicked', () => {
    renderWithHelmet(<AdvicePage />);
    expect(screen.getByText('Dating Etiquette: A Satirical Handbook')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Breakup Advice'));
    expect(screen.getByText('Essential Breakup Recovery Guide')).toBeInTheDocument();
    expect(screen.getByText('Ultimate Post-Breakup Workout Plan')).toBeInTheDocument();
    expect(screen.getByText('Weekly Breakup Recovery Schedule')).toBeInTheDocument();
  });

  it('switches back to dating tab after switching to breakup', () => {
    renderWithHelmet(<AdvicePage />);
    fireEvent.click(screen.getByText('Breakup Advice'));
    expect(screen.getByText('Essential Breakup Recovery Guide')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Dating Etiquette'));
    expect(screen.getByText('Dating Etiquette: A Satirical Handbook')).toBeInTheDocument();
  });

  it('adds animation styles to document head on mount', () => {
    renderWithHelmet(<AdvicePage />);
    expect(document.head.appendChild).toHaveBeenCalledTimes(1);
    expect(document.head.appendChild).toHaveBeenCalledWith(expect.any(Object));
  });

  it('removes animation styles from document head on unmount', () => {
    const { unmount } = renderWithHelmet(<AdvicePage />);
    unmount();
    expect(document.head.removeChild).toHaveBeenCalledTimes(1);
  });

  it('displays correct metadata title for dating tab', () => {
    renderWithHelmet(<AdvicePage />);
    expect(document.title).toBe('Dating Etiquette Guide | Satirical Dating Advice | Red Flag Checker');
  });

  it('displays correct metadata title for breakup tab', () => {
    renderWithHelmet(<AdvicePage />);
    fireEvent.click(screen.getByText('Breakup Advice'));
    expect(document.title).toBe('Breakup Recovery Guide | Satirical Breakup Advice | Red Flag Checker');
  });

  it('displays the humor disclaimer', () => {
    renderWithHelmet(<AdvicePage />);
    const disclaimer = screen.getByText('Humor Disclaimer');
    expect(disclaimer).toBeInTheDocument();
    const disclaimerText = screen.getByText(/This advice is satirical and meant for entertainment purposes only/);
    expect(disclaimerText).toBeInTheDocument();
  });

  it('displays the "Golden Advice" section in dating tab', () => {
    renderWithHelmet(<AdvicePage />);
    const goldenAdviceTitle = screen.getByText(/Golden Advice: How To Actually Treat Someone/);
    expect(goldenAdviceTitle).toBeInTheDocument();
    expect(screen.getByText(/Be authentic and honest from the beginning/)).toBeInTheDocument();
    expect(screen.getByText(/Listen actively when they speak/)).toBeInTheDocument();
  });

  it('displays the Breakup Workout table in breakup tab', () => {
    renderWithHelmet(<AdvicePage />);
    fireEvent.click(screen.getByText('Breakup Advice'));
    expect(screen.getByText('Exercise')).toBeInTheDocument();
    expect(screen.getByText('Sets')).toBeInTheDocument();
    expect(screen.getByText('Reps')).toBeInTheDocument();
    expect(screen.getByText('Emotional Benefit')).toBeInTheDocument();
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Deadlifts')).toBeInTheDocument();
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });

  it('displays the real advice resources section', () => {
    renderWithHelmet(<AdvicePage />);
    expect(screen.getByText('Looking for Real Advice?')).toBeInTheDocument();
    const psychologyTodayLink = screen.getByText('Psychology Today');
    expect(psychologyTodayLink).toBeInTheDocument();
    const gottmanLink = screen.getByText('The Gottman Institute');
    expect(gottmanLink).toBeInTheDocument();
    const betterHelpLink = screen.getByText('BetterHelp');
    expect(betterHelpLink).toBeInTheDocument();
  });

  it('generates correct schema data for dating tab', () => {
    renderWithHelmet(<AdvicePage />);
    const scriptTag = document.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).not.toBeNull();
    if (scriptTag && scriptTag.textContent !== null) {
      const schemaData = JSON.parse(scriptTag.textContent);
      expect(schemaData.mainEntity.headline).toBe('Dating Etiquette: A Satirical Handbook');
      expect(schemaData.mainEntity['@type']).toBe('Article');
    } else {
      throw new Error('Script tag or its textContent is null');
    }
  });

  it('generates correct schema data for breakup tab', () => {
    renderWithHelmet(<AdvicePage />);
    fireEvent.click(screen.getByText('Breakup Advice'));
    const scriptTag = document.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).not.toBeNull();
    if (scriptTag && scriptTag.textContent !== null) {
      const schemaData = JSON.parse(scriptTag.textContent);
      expect(schemaData.mainEntity.name).toBe('Ultimate Post-Breakup Workout Plan');
      expect(schemaData.mainEntity['@type']).toBe('HowTo');
    } else {
      throw new Error('Script tag or its textContent is null');
    }
  });
});