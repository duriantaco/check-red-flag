/// <reference types="vitest/globals" />
import React from 'react'; 
import { render, screen, fireEvent } from './test-utils';
import Header from '../src/components/Header';
import { vi } from 'vitest';

describe('Header Component', () => {
  it('renders the logo and navigation links', () => {
    render(<Header viewMode="edit" setViewMode={vi.fn()} />);

    expect(screen.getByText('Dating Red Flag Checker')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByText('Advice')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders Edit Mode button in shared view mode', () => {
    render(<Header viewMode="shared" setViewMode={vi.fn()} />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);

    const editModeButtons = screen.getAllByText('Edit Mode');
    expect(editModeButtons.length).toBeGreaterThan(0);
  });
});