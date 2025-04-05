import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ResultDisplay from '../src/components/ResultDisplay';

describe('ResultDisplay Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders low risk level when percentage is less than 20%', () => {
    render(<ResultDisplay score={10} maxScore={100} />);
    
    expect(screen.getByText("Low Risk - Seems chill, but keep an eye out.")).toBeInTheDocument();
    expect(screen.getByText("Score: 10 / 100")).toBeInTheDocument();
    expect(screen.getByText("Verdict")).toBeInTheDocument();
    
    const container = screen.getByText("Verdict").closest('div');
    expect(container).toHaveClass('bg-green-900');
  });
  
  it('renders moderate risk level when percentage is between 20% and 50%', () => {
    render(<ResultDisplay score={30} maxScore={100} />);
    
    expect(screen.getByText("Moderate Risk - Proceed with caution.")).toBeInTheDocument();
    expect(screen.getByText("Score: 30 / 100")).toBeInTheDocument();
    
    const container = screen.getByText("Verdict").closest('div');
    expect(container).toHaveClass('bg-yellow-900');
  });
  
  it('renders high risk level when percentage is 50% or higher', () => {
    render(<ResultDisplay score={50} maxScore={100} />);
    
    expect(screen.getByText("High Risk - This one's a walking red flag.")).toBeInTheDocument();
    expect(screen.getByText("Score: 50 / 100")).toBeInTheDocument();
    
    const container = screen.getByText("Verdict").closest('div');
    expect(container).toHaveClass('bg-red-900');
  });
  
  it('handles 0% score correctly (low risk)', () => {
    render(<ResultDisplay score={0} maxScore={100} />);
    expect(screen.getByText("Low Risk - Seems chill, but keep an eye out.")).toBeInTheDocument();
  });

  it('handles exactly 20% score correctly (moderate risk)', () => {
    render(<ResultDisplay score={20} maxScore={100} />);
    expect(screen.getByText("Moderate Risk - Proceed with caution.")).toBeInTheDocument();
  });

  it('handles exactly 50% score correctly (high risk)', () => {
    render(<ResultDisplay score={50} maxScore={100} />);
    expect(screen.getByText("High Risk - This one's a walking red flag.")).toBeInTheDocument();
  });
  
  it('handles different maxScore values correctly', () => {
    render(<ResultDisplay score={2} maxScore={10} />);
    expect(screen.getByText("Score: 2 / 10")).toBeInTheDocument();
    expect(screen.getByText("Moderate Risk - Proceed with caution.")).toBeInTheDocument();
  });
  
  it('handles edge case with extremely high score', () => {
    render(<ResultDisplay score={999} maxScore={1000} />);
    expect(screen.getByText("High Risk - This one's a walking red flag.")).toBeInTheDocument();
  });
  
  it('handles edge case with zero maxScore', () => {

    render(<ResultDisplay score={0} maxScore={0} />);
    expect(screen.getByText("Verdict")).toBeInTheDocument();
  });
});