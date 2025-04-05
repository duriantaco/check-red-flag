import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi } from 'vitest';
import ProfileSidebar from '../src/components/ProfileSidebar';

describe('ProfileSidebar Component', () => {
  const mockProps = {
    profileName: 'Test Profile',
    setProfileName: vi.fn(),
    currentProfile: 'Test Profile',
    profiles: {
      'Test Profile': {},
      'Another Profile': {}
    },
    setCurrentProfile: vi.fn(),
    setTraitSelections: vi.fn(),
    setShowProfileModal: vi.fn(),
    deleteCurrentProfile: vi.fn(),
    generateShareableLink: vi.fn(),
    downloadAsImage: vi.fn(),
    resetSelections: vi.fn(),
    setShowCustomTraitModal: vi.fn(),
    riskLevel: 'Moderate',
    riskColor: 'orange',
    redScore: 30,
    greenScore: 45,
    netScore: 15,
    ratedTraitsCount: 10,
    totalTraitsCount: 20
  };

  afterEach(cleanup);

  it('renders profile information correctly', () => {
    render(<ProfileSidebar {...mockProps} />);
    
    const profileNameHeading = screen.getAllByText('Test Profile')[0];
    expect(profileNameHeading).toBeInTheDocument();
    expect(screen.getByText('Risk Summary')).toBeInTheDocument();    
    expect(screen.getByText(/Moderate.*Risk/)).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('10 / 20')).toBeInTheDocument();
  });

  it('displays multiple profiles when available', () => {
    render(<ProfileSidebar {...mockProps} />);
    
    expect(screen.getByText('Your Profiles')).toBeInTheDocument();
    expect(screen.getByText('Another Profile')).toBeInTheDocument();
  });

  it('calls appropriate functions when buttons are clicked', () => {
    render(<ProfileSidebar {...mockProps} />);
    
    fireEvent.click(screen.getByText('Another Profile'));
    expect(mockProps.setCurrentProfile).toHaveBeenCalledWith('Another Profile');
    
    fireEvent.click(screen.getByText('Reset Answers'));
    expect(mockProps.resetSelections).toHaveBeenCalled();
    
    fireEvent.click(screen.getByText('Share Results'));
    expect(mockProps.generateShareableLink).toHaveBeenCalled();
    
    fireEvent.click(screen.getByText('Download Results'));
    expect(mockProps.downloadAsImage).toHaveBeenCalled();
    
    fireEvent.click(screen.getByText('Add Custom Trait'));
    expect(mockProps.setShowCustomTraitModal).toHaveBeenCalledWith(true);
  });

  it('shows delete profile button for non-default profiles', () => {
    render(<ProfileSidebar {...mockProps} />);
    expect(screen.getByText('Delete Profile')).toBeInTheDocument();
  });
  
  it('hides delete profile button for default profile', () => {
    const defaultProfileProps = {
      ...mockProps,
      currentProfile: 'Default'
    };
    
    render(<ProfileSidebar {...defaultProfileProps} />);
    expect(screen.queryByText('Delete Profile')).not.toBeInTheDocument();
  });
});