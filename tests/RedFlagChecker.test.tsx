import React from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import RedFlagApp from '../src/pages/RedFlagChecker';

let locationHash = '';
Object.defineProperty(window, 'location', {
  value: {
    get hash() {
      return locationHash;
    },
    set hash(value) {
      locationHash = value;
    },
    origin: 'http://localhost',
    pathname: '/',
    search: '',
  },
  writable: true,
});

vi.mock('react-helmet-async', () => ({
  Helmet: vi.fn(({ children }) => <div data-testid="helmet-mock">{children}</div>),
  HelmetProvider: ({ children }) => <div>{children}</div>,
}));

vi.mock('../ishearedflag/src/components/Header', () => ({
  default: vi.fn(({ viewMode, setViewMode }) => (
    <div data-testid="mock-header">
      <span>Header</span>
      <button onClick={() => setViewMode(viewMode === 'edit' ? 'shared' : 'edit')}>
        Toggle View Mode
      </button>
    </div>
  )),
}));

vi.mock('../ishearedflag/src/components/Footer', () => ({
  default: vi.fn(() => <div data-testid="mock-footer">Footer</div>),
}));

vi.mock('../ishearedflag/src/components/ProfileSidebar', () => ({
  default: vi.fn(({ profileName, setShowProfileModal, setShowCustomTraitModal, generateShareableLink, downloadAsImage }) => (
    <div data-testid="mock-profile-sidebar">
      <span data-testid="profile-name">{profileName}</span>
      <button data-testid="open-profile-modal" onClick={() => setShowProfileModal(true)}>Add Profile</button>
      <button data-testid="open-custom-trait-modal" onClick={() => setShowCustomTraitModal(true)}>Add Trait</button>
      <button data-testid="generate-share-link" onClick={generateShareableLink}>Share</button>
      <button data-testid="download-image" onClick={downloadAsImage}>Download</button>
    </div>
  )),
}));

vi.mock('../ishearedflag/src/components/RelationshipAssessment', () => ({
  default: vi.fn(({ onChange, viewMode }) => (
    <div data-testid="mock-relationship-assessment">
      <button 
        data-testid="select-trait" 
        onClick={() => onChange('trait1', 'yes')}
        disabled={viewMode === 'shared'}
      >
        Select Trait
      </button>
    </div>
  )),
}));

vi.mock('../ishearedflag/src/components/RelationshipResults', () => ({
  default: vi.fn(() => <div data-testid="mock-relationship-results">Results</div>),
}));

vi.mock('../ishearedflag/src/components/TraitProgress', () => ({
  default: vi.fn(() => <div data-testid="mock-trait-progress">Progress</div>),
}));

vi.mock('../ishearedflag/src/components/SharedBanner', () => ({
  default: vi.fn(({ profileName }) => (
    <div data-testid="mock-shared-banner">
      Shared Profile: {profileName}
    </div>
  )),
}));

vi.mock('../ishearedflag/src/components/modals/ProfileModal', () => ({
  default: vi.fn(({ newProfileName, setNewProfileName, setShowProfileModal, addNewProfile }) => (
    <div data-testid="mock-profile-modal">
      <input
        data-testid="profile-name-input"
        value={newProfileName}
        onChange={(e) => setNewProfileName(e.target.value)}
      />
      <button data-testid="add-profile" onClick={addNewProfile}>Add</button>
      <button data-testid="close-profile-modal" onClick={() => setShowProfileModal(false)}>Close</button>
    </div>
  )),
}));

vi.mock('../ishearedflag/src/components/modals/CustomFlagModal', () => ({
  default: vi.fn(({ customFlag, setCustomFlag, setShowCustomFlagModal, addCustomFlag }) => (
    <div data-testid="mock-custom-flag-modal">
      <input
        data-testid="custom-trait-input"
        value={customFlag}
        onChange={(e) => setCustomFlag(e.target.value)}
      />
      <button data-testid="add-custom-trait" onClick={addCustomFlag}>Add</button>
      <button data-testid="close-custom-modal" onClick={() => setShowCustomFlagModal(false)}>Close</button>
    </div>
  )),
}));

vi.mock('../ishearedflag/src/components/modals/ShareModal', () => ({
  default: vi.fn(({ shareableLink, copyToClipboard, setShowShareModal, downloadAsImage }) => (
    <div data-testid="mock-share-modal">
      <input data-testid="shareable-link" value={shareableLink} readOnly />
      <button data-testid="copy-link" onClick={copyToClipboard}>Copy</button>
      <button data-testid="download-share-image" onClick={downloadAsImage}>Download</button>
      <button data-testid="close-share-modal" onClick={() => setShowShareModal(false)}>Close</button>
    </div>
  )),
}));

vi.mock('../ishearedflag/src/relationshipTraitSystem', () => ({
  relationshipTraits: { Communication: [{ trait: 'trait1' }] },
  calculateRelationshipScore: vi.fn(() => ({ redScore: 0, greenScore: 0, netScore: 0 })),
  calculateRiskLevel: vi.fn(() => ({ level: 'low', message: '', color: 'green' })),
}));

let store = {};
const getItemMock = vi.fn(key => store[key] || null);
const setItemMock = vi.fn((key, value) => {
  store[key] = value.toString();
});
const clearMock = vi.fn(() => {
  store = {};
});
const removeItemMock = vi.fn(key => {
  delete store[key];
});

const localStorageMock = {
  getItem: getItemMock,
  setItem: setItemMock,
  clear: clearMock,
  removeItem: removeItemMock
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

vi.mock('dom-to-image', () => ({
  toPng: vi.fn(() => Promise.resolve('data:image/png;base64,mock-image')),
}));

Object.defineProperty(window, 'domtoimage', {
  value: { toPng: vi.fn(() => Promise.resolve('data:image/png;base64,mock-image')) },
  writable: true,
});

Object.defineProperty(navigator, 'clipboard', {
  value: { 
    writeText: vi.fn(() => Promise.resolve()) 
  },
  writable: true,
});

global.alert = vi.fn();

const renderWithProviders = (options: { hash?: string } = {}) => {
    const { hash = '' } = options;
    locationHash = hash;
    return render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <RedFlagApp />
        </MemoryRouter>
      </HelmetProvider>
    );
  };

describe('RedFlagApp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearMock();
    getItemMock.mockClear();
    setItemMock.mockClear();
    removeItemMock.mockClear();
    locationHash = '';
  });

  it('renders the component in edit mode by default', () => {
    renderWithProviders();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-profile-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-trait-progress')).toBeInTheDocument();
    expect(screen.getByTestId('mock-relationship-assessment')).toBeInTheDocument();
    expect(screen.getByTestId('mock-relationship-results')).toBeInTheDocument();
  });

  it('renders shared view mode when URL hash is present', async () => {
    const sharedData = btoa(JSON.stringify({ s: { trait1: 'yes' }, n: 'Shared Profile' }));
    renderWithProviders({ hash: `#share=${sharedData}` });
    await waitFor(() => {
      expect(screen.queryByTestId('mock-profile-sidebar')).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('mock-shared-banner')).toBeInTheDocument();
    expect(screen.getByTestId('mock-shared-banner')).toHaveTextContent('Shared Profile: Shared Profile');
  });

  it('handles profile creation', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByTestId('open-profile-modal'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-profile-modal')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId('profile-name-input'), { target: { value: 'New Profile' } });
    fireEvent.click(screen.getByTestId('add-profile'));
    await waitFor(() => {
      expect(screen.queryByTestId('mock-profile-modal')).not.toBeInTheDocument();
    });
    expect(setItemMock).toHaveBeenCalledWith('traitProfiles', expect.any(String));
  });

  it('handles trait selection in edit mode', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByTestId('select-trait'));
    await waitFor(() => {
      expect(setItemMock).toHaveBeenCalledWith('traitProfiles', expect.any(String));
    });
  });

  it('does not allow trait selection in shared mode', async () => {
    const sharedData = btoa(JSON.stringify({ s: { trait1: 'positive' }, n: 'Shared Profile' }));
    renderWithProviders({ hash: `#share=${sharedData}` });
    await waitFor(() => {
      expect(screen.queryByTestId('mock-profile-sidebar')).not.toBeInTheDocument();
    });
    setItemMock.mockReset();
    fireEvent.click(screen.getByTestId('select-trait'));
    expect(setItemMock).not.toHaveBeenCalledWith('traitProfiles', expect.any(String));
  });

  it('handles custom trait addition', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByTestId('open-custom-trait-modal'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-custom-flag-modal')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId('custom-trait-input'), { target: { value: 'New Trait' } });
    fireEvent.click(screen.getByTestId('add-custom-trait'));
    await waitFor(() => {
      expect(screen.queryByTestId('mock-custom-flag-modal')).not.toBeInTheDocument();
    });
    expect(setItemMock).toHaveBeenCalledWith('customTraits', expect.any(String));
  });

  it('generates shareable link', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByTestId('generate-share-link'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-share-modal')).toBeInTheDocument();
    });
    const linkInput = screen.getByTestId('shareable-link') as HTMLInputElement;
    expect(linkInput.value).toMatch(/http:\/\/localhost\/#share=/);
    fireEvent.click(screen.getByTestId('copy-link'));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('downloads results as image', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByTestId('download-image'));
    await waitFor(() => {
      expect(window.domtoimage.toPng).toHaveBeenCalled();
    });
  });

  it('handles invalid shared link gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderWithProviders({ hash: '#share=invalid' });
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to load shared profile'));
    });
    expect(screen.getByTestId('mock-profile-sidebar')).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  it('closes modals correctly', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByTestId('open-profile-modal'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-profile-modal')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('close-profile-modal'));
    await waitFor(() => {
      expect(screen.queryByTestId('mock-profile-modal')).not.toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('open-custom-trait-modal'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-custom-flag-modal')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('close-custom-modal'));
    await waitFor(() => {
      expect(screen.queryByTestId('mock-custom-flag-modal')).not.toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('generate-share-link'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-share-modal')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('close-share-modal'));
    await waitFor(() => {
      expect(screen.queryByTestId('mock-share-modal')).not.toBeInTheDocument();
    });
  });
});