import React from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import CalculatorPage from '../src/pages/CalculatorPage';

vi.mock('../ishearedflag/src/components/Header', () => ({
  default: vi.fn(() => <div data-testid="mock-header" />),
}));

vi.mock('../ishearedflag/src/components/Footer', () => ({
  default: vi.fn(() => <div data-testid="mock-footer" />),
}));

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid="mock-helmet">{children}</div>,
  HelmetProvider: ({ children }) => <div>{children}</div>,
}));

describe('CalculatorPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderCalculatorPage = () => {
    return render(
      <HelmetProvider>
        <CalculatorPage />
      </HelmetProvider>
    );
  };

  const getSelectByHeading = (headingText: string): HTMLSelectElement => {
    const heading = screen.getByText(headingText);
    const section = heading.closest('div');
    if (!section) throw new Error(`Could not find section for heading: ${headingText}`);
    return within(section).getByRole('combobox') as HTMLSelectElement;
  };

  const getCriteriaSelect = (criteriaName: string): HTMLSelectElement => {
    const criteriaHeadings = screen.getAllByText(criteriaName, { selector: 'label, span, div, h1, h2, h3, h4, h5, h6' });
    if (!criteriaHeadings.length) throw new Error(`Could not find any headings for: ${criteriaName}`);
    
    const criteriaDiv = criteriaHeadings[0].closest('div');
    if (!criteriaDiv) throw new Error(`Could not find parent div for: ${criteriaName}`);
    
    return within(criteriaDiv).getByRole('combobox') as HTMLSelectElement;
  };

  it('renders the component with header, footer and main sections', () => {
    renderCalculatorPage();
    
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByText('Dating Pool Reality Calculator')).toBeInTheDocument();
    expect(screen.getByText(/Use our free Dating Pool Reality Calculator/)).toBeInTheDocument();
  });

  it('renders the disclaimer section', () => {
    renderCalculatorPage();
    
    expect(screen.getByText('Statistical Accuracy Disclaimer')).toBeInTheDocument();
    expect(screen.getByText(/The statistics used in this calculator/)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Read More'));
    expect(screen.getByText(/Census Error Margins:/)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Show Less'));
    expect(screen.queryByText(/Census Error Margins:/)).not.toBeInTheDocument();
  });

  it('renders region and gender preference sections', () => {
    renderCalculatorPage();
    
    expect(screen.getByText('Geographic Region')).toBeInTheDocument();
    const regionSelect = getSelectByHeading('Geographic Region');
    expect(regionSelect).toBeInTheDocument();
    expect(regionSelect).toHaveValue('us');
    
    expect(screen.getByText('Gender Preference')).toBeInTheDocument();
    expect(screen.getByLabelText('Looking for men')).toBeChecked();
    expect(screen.getByLabelText('Looking for women')).not.toBeChecked();
  });

  it('changes adultPopulation when region is changed', () => {
    renderCalculatorPage();
    
    fireEvent.change(getCriteriaSelect('Height'), { target: { value: '6-0' } });
    
    const resultsSection = screen.getByText('Results').closest('div');
    if (!resultsSection) throw new Error("Could not find results section");
    
    const usText = within(resultsSection).getByText((content) => {
      return content.includes("people in the U.S.");
    });
    expect(usText).toBeInTheDocument();
    
    const regionSelect = getSelectByHeading('Geographic Region');
    fireEvent.change(regionSelect, { target: { value: 'global' } });
    
    const globalText = within(resultsSection).getByText((content) => {
      return content.includes("people in your selected region");
    });
    expect(globalText).toBeInTheDocument();
    
    expect(screen.getByText(/Non-US statistics include region-specific adjustments/)).toBeInTheDocument();
  });
  
  it('changes available options when gender preference is changed', () => {
    renderCalculatorPage();
    
    const heightSelect = getCriteriaSelect('Height');
    
    const heightOptions = Array.from(heightSelect.options).map(opt => opt.textContent);
    expect(heightOptions.some(text => text && text.includes("6' or taller"))).toBeTruthy();
    
    fireEvent.click(screen.getByLabelText('Looking for women'));
    
    const updatedHeightOptions = Array.from(heightSelect.options).map(opt => opt.textContent);
    expect(updatedHeightOptions.some(text => text && text.includes("5'10\" or taller"))).toBeTruthy();
    expect(updatedHeightOptions.some(text => text && text.includes("6'4\" or taller"))).toBeFalsy();
  });

  it('updates probability when criteria are selected', () => {
    renderCalculatorPage();
    
    expect(screen.getByText('REALISTIC')).toBeInTheDocument();
    
    const heightSelect = getCriteriaSelect('Height');
    const incomeSelect = getCriteriaSelect('Income');
    const educationSelect = getCriteriaSelect('Education');
    
    fireEvent.change(heightSelect, { target: { value: '6-4' } });
    fireEvent.change(incomeSelect, { target: { value: '300k' } });
    fireEvent.change(educationSelect, { target: { value: 'doctorate' } });

    expect(screen.queryByText('REALISTIC')).not.toBeInTheDocument();
    
    const resultsSection = screen.getByText('Results').closest('div');
    if (!resultsSection) throw new Error("Could not find results section");
    
    const percentageText = within(resultsSection).getByText((content) => {
      return content.includes("of the population matches all your criteria");
    });
    expect(percentageText).toBeInTheDocument();
  });

  it('resets all selections when reset button is clicked', () => {
    renderCalculatorPage();
    
    const heightSelect = getCriteriaSelect('Height');
    fireEvent.change(heightSelect, { target: { value: '6-0' } });
    
    const raceSelect = getCriteriaSelect('Race/Ethnicity');
    fireEvent.change(raceSelect, { target: { value: 'white' } });
    
    fireEvent.click(screen.getByText('Reset All'));
    
    expect(heightSelect.value).toBe('');
    expect(raceSelect.value).toBe('');
    
    expect(screen.getByText('REALISTIC')).toBeInTheDocument();
  });

  it('shows warning when selection criteria result in a small pool', () => {
    renderCalculatorPage();
    
    fireEvent.change(getCriteriaSelect('Height'), { target: { value: '6-4' } });
    fireEvent.change(getCriteriaSelect('Income'), { target: { value: '300k' } });
    fireEvent.change(getCriteriaSelect('Education'), { target: { value: 'doctorate' } });
    
    expect(screen.getByText(/The pool of people matching your criteria is extremely small/)).toBeInTheDocument();
  });

  it('shows extreme warning when criteria are statistically improbable', () => {
    renderCalculatorPage();
    
    fireEvent.change(getCriteriaSelect('Height'), { target: { value: '6-5' } });
    fireEvent.change(getCriteriaSelect('Income'), { target: { value: '500k' } });
    fireEvent.change(getCriteriaSelect('Education'), { target: { value: 'doctorate' } });
    fireEvent.change(getCriteriaSelect('Body Type'), { target: { value: 'very-athletic' } });
    fireEvent.change(getCriteriaSelect('Race/Ethnicity'), { target: { value: 'asian' } });
    
    expect(screen.getByText(/Your criteria are so restrictive that a match is statistically improbable/)).toBeInTheDocument();
  });

  it('shows detailed descriptions for selected criteria', () => {
    renderCalculatorPage();
    
    fireEvent.change(getCriteriaSelect('Race/Ethnicity'), { target: { value: 'white' } });
    
    expect(screen.getByText(/57.8% of US population/)).toBeInTheDocument();
  });

  it('displays different confidence levels based on selections', () => {
    renderCalculatorPage();
    
    fireEvent.change(getCriteriaSelect('Height'), { target: { value: '6-0' } });
    fireEvent.change(getCriteriaSelect('Income'), { target: { value: '100k' } });
    fireEvent.change(getCriteriaSelect('Education'), { target: { value: 'college' } });
    fireEvent.change(getCriteriaSelect('Body Type'), { target: { value: 'athletic' } });
    
    const confidenceLevelElement = screen.getByText(/Statistical confidence level:/).nextElementSibling;
    if (!confidenceLevelElement) throw new Error("Could not find confidence level element");
    
    expect(confidenceLevelElement.textContent).toMatch(/MODERATE|LOW/i);
  });
});
