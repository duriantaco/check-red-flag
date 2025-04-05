import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TraitCategorySection } from '../src/components/TraitCategorySection';
import { TraitSpectrumSelector } from '../src/components/TraitSpectrumSelector';

vi.mock('../ishearedflag/src/components/TraitSpectrumSelector', () => ({
  TraitSpectrumSelector: vi.fn(() => <div data-testid="mock-trait-selector" />)
}));

describe('TraitCategorySection', () => {
  const mockProps = {
    category: 'Communication',
    traits: [
      {
        trait: 'Listening',
        negative: 'Poor listener',
        positive: 'Active listener',
        negativeWeight: 5,
        positiveWeight: 5
      },
      {
        trait: 'Openness',
        negative: 'Secretive',
        positive: 'Transparent',
        negativeWeight: 4,
        positiveWeight: 3
      }
    ],
    selections: {
      'communication_listening': 'positive',
      'communication_openness': 'negative'
    },
    onChange: vi.fn(),
    viewMode: 'edit' as const
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with the correct category title', () => {
    render(<TraitCategorySection {...mockProps} />);
    expect(screen.getByText('Communication')).toBeInTheDocument();
  });

  it('initially renders in expanded state', () => {
    render(<TraitCategorySection {...mockProps} />);
    expect(screen.getByText('−')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-trait-selector').length).toBe(2);
  });

  it('collapses when the header is clicked', () => {
    render(<TraitCategorySection {...mockProps} />);
    fireEvent.click(screen.getByText('Communication'));
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.queryAllByTestId('mock-trait-selector').length).toBe(0);
  });

  it('expands again when clicked while collapsed', () => {
    render(<TraitCategorySection {...mockProps} />);
    
    fireEvent.click(screen.getByText('Communication'));
    expect(screen.getByText('+')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Communication'));
    expect(screen.getByText('−')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-trait-selector').length).toBe(2);
  });

  it('renders TraitSpectrumSelector for each trait', () => {
    render(<TraitCategorySection {...mockProps} />);
    expect(TraitSpectrumSelector).toHaveBeenCalledTimes(2);
    expect(TraitSpectrumSelector).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'Communication',
        trait: mockProps.traits[0],
        selection: 'positive',
        viewMode: 'edit'
      }),
      expect.anything()
    );
    expect(TraitSpectrumSelector).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'Communication',
        trait: mockProps.traits[1],
        selection: 'negative',
        viewMode: 'edit'
      }),
      expect.anything()
    );
  });

  it('applies the correct background color based on category', () => {
    const categories = [
      { name: 'Communication', expectedColor: 'from-indigo-500 to-indigo-600' },
      { name: 'Respect & Boundaries', expectedColor: 'from-pink-500 to-pink-600' },
      { name: 'Independence', expectedColor: 'from-teal-500 to-teal-600' },
      { name: 'Emotional Patterns', expectedColor: 'from-violet-500 to-violet-600' },
      { name: 'Trust', expectedColor: 'from-red-500 to-red-600' },
      { name: 'Lifestyle', expectedColor: 'from-yellow-500 to-yellow-600' },
      { name: 'Character', expectedColor: 'from-green-500 to-green-600' },
      { name: 'Other Category', expectedColor: 'from-blue-500 to-blue-600' }
    ];

    categories.forEach(({ name, expectedColor }) => {
      const { unmount } = render(
        <TraitCategorySection
          {...mockProps}
          category={name}
        />
      );
      
      const button = screen.getByText(name).closest('button');
      expect(button).toHaveClass(expectedColor);
      
      unmount();
    });
  });
});