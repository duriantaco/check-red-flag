import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

interface Criterion {
  name: string;
  options: Option[];
  selected: string | null;
  maleOptions?: Option[];
  femaleOptions?: Option[];
  description?: string;
}

interface Option {
  label: string;
  value: string;
  percentage: number;
  description?: string;
  source?: string;
}

interface RegionOption {
  label: string;
  value: string;
  population: number;
}

const CalculatorPage = () => {
  const regionOptions: RegionOption[] = [
    { label: 'United States', value: 'us', population: 333.3 },
    { label: 'Global', value: 'global', population: 8000 },
    { label: 'Western Europe', value: 'western-europe', population: 196 },
    { label: 'East Asia', value: 'east-asia', population: 1700 },
    { label: 'South Asia', value: 'south-asia', population: 1900 },
    { label: 'Latin America', value: 'latin-america', population: 660 },
    { label: 'Africa', value: 'africa', population: 1400 },
  ];

  const [region, setRegion] = useState<string>('us');
  const [adultPopulation, setAdultPopulation] = useState<number>(258.3);
  const [disclaimerExpanded, setDisclaimerExpanded] = useState<boolean>(false);

  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });

  useEffect(() => {
    const selectedRegion = regionOptions.find((r) => r.value === region);
    if (selectedRegion) {
      setAdultPopulation(selectedRegion.population * 0.76);
    }
  }, [region]);

  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      name: 'Race/Ethnicity',
      description: 'Racial/ethnic demographics vary significantly by region',
      options: [
        { label: 'Any race/ethnicity', value: 'any', percentage: 100 },
        { label: 'White/Caucasian', value: 'white', percentage: 57.8, description: '57.8% of US population', source: 'US Census Bureau, 2023' },
        { label: 'Black/African American', value: 'black', percentage: 14.1, description: '14.1% of US population', source: 'US Census Bureau, 2023' },
        { label: 'Hispanic/Latino', value: 'hispanic', percentage: 19.1, description: '19.1% of US population', source: 'US Census Bureau, 2023' },
        { label: 'Asian', value: 'asian', percentage: 6.4, description: '6.4% of US population', source: 'US Census Bureau, 2023' },
        { label: 'Native American', value: 'native', percentage: 1.3, description: '1.3% of US population', source: 'US Census Bureau, 2023' },
        { label: 'Other/Mixed', value: 'mixed', percentage: 1.3, description: '~1.3% of US population', source: 'US Census Bureau, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Height',
      description: 'Height distributions vary by gender and ethnicity',
      options: [],
      maleOptions: [
        { label: 'Any height', value: 'any', percentage: 100 },
        { label: "5'8\" or taller", value: '5-8', percentage: 64.2, description: "~64.2% of US men are 5'8\" or taller", source: 'CDC, 2023' },
        { label: "5'10\" or taller", value: '5-10', percentage: 37.8, description: "~37.8% of US men are 5'10\" or taller", source: 'CDC, 2023' },
        { label: "6' or taller", value: '6-0', percentage: 14.7, description: "~14.7% of US men are 6' or taller", source: 'CDC, 2023' },
        { label: "6'2\" or taller", value: '6-2', percentage: 4.8, description: "~4.8% of US men are 6'2\" or taller", source: 'CDC, 2023' },
        { label: "6'4\" or taller", value: '6-4', percentage: 1.2, description: "~1.2% of US men are 6'4\" or taller", source: 'CDC, 2023' },
        { label: "6'5\" or taller", value: '6-5', percentage: 0.4, description: "Only ~0.4% of US men are 6'5\" or taller", source: 'CDC, 2023' },
      ],
      femaleOptions: [
        { label: 'Any height', value: 'any', percentage: 100 },
        { label: "5'4\" or taller", value: '5-4', percentage: 61.5, description: "~61.5% of US women are 5'4\" or taller", source: 'CDC, 2023' },
        { label: "5'6\" or taller", value: '5-6', percentage: 29.7, description: "~29.7% of US women are 5'6\" or taller", source: 'CDC, 2023' },
        { label: "5'8\" or taller", value: '5-8', percentage: 10.2, description: "~10.2% of US women are 5'8\" or taller", source: 'CDC, 2023' },
        { label: "5'10\" or taller", value: '5-10', percentage: 2.3, description: "Only ~2.3% of US women are 5'10\" or taller", source: 'CDC, 2023' },
        { label: "6' or taller", value: '6-0', percentage: 0.5, description: "Less than 0.5% of US women are 6' or taller", source: 'CDC, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Hair Color',
      description: 'Natural hair color distributions vary significantly by ethnicity',
      options: [
        { label: 'Any hair color', value: 'any', percentage: 100 },
        { label: 'Brown hair (natural)', value: 'brown', percentage: 58.2, description: '~58.2% of US population has natural brown hair', source: 'Multiple anthropological studies, 2023' },
        { label: 'Blonde hair (natural)', value: 'blonde', percentage: 13.1, description: '~13.1% of US population has natural blonde hair', source: 'National Center for Biotechnology Information, 2023' },
        { label: 'Black hair (natural)', value: 'black', percentage: 26.8, description: '~26.8% of US population has natural black hair', source: 'National Center for Biotechnology Information, 2023' },
        { label: 'Red hair (natural)', value: 'red', percentage: 1.9, description: 'Only ~1.9% of US population has natural red hair', source: 'National Center for Biotechnology Information, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Eye Color',
      description: 'Eye color distributions vary by ethnicity and region',
      options: [
        { label: 'Any eye color', value: 'any', percentage: 100 },
        { label: 'Brown eyes', value: 'brown', percentage: 56.1, description: '~56.1% of US population has brown eyes', source: 'American Academy of Ophthalmology, 2023' },
        { label: 'Blue eyes', value: 'blue', percentage: 25.2, description: '~25.2% of US population has blue eyes', source: 'American Academy of Ophthalmology, 2023' },
        { label: 'Hazel eyes', value: 'hazel', percentage: 16.3, description: '~16.3% of US population has hazel eyes', source: 'American Academy of Ophthalmology, 2023' },
        { label: 'Green eyes', value: 'green', percentage: 8.6, description: 'Only ~8.6% of US population has green eyes', source: 'American Academy of Ophthalmology, 2023' },
        { label: 'Gray eyes', value: 'gray', percentage: 0.8, description: 'Less than 1% of US population has true gray eyes', source: 'American Academy of Ophthalmology, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Income',
      description: 'Income distributions vary by gender, race, and region',
      options: [],
      maleOptions: [
        { label: 'Any income', value: 'any', percentage: 100 },
        { label: '$50k+ per year', value: '50k', percentage: 46.3, description: '~46.3% of US men make $50k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$75k+ per year', value: '75k', percentage: 31.2, description: '~31.2% of US men make $75k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$100k+ per year', value: '100k', percentage: 17.8, description: '~17.8% of US men make $100k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$150k+ per year', value: '150k', percentage: 8.9, description: '~8.9% of US men make $150k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$200k+ per year', value: '200k', percentage: 5.2, description: '~5.2% of US men make $200k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$300k+ per year', value: '300k', percentage: 2.1, description: '~2.1% of US men make $300k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$500k+ per year', value: '500k', percentage: 0.7, description: '~0.7% of US men make $500k+ per year', source: 'US Census Bureau, 2023' },
      ],
      femaleOptions: [
        { label: 'Any income', value: 'any', percentage: 100 },
        { label: '$50k+ per year', value: '50k', percentage: 32.6, description: '~32.6% of US women make $50k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$75k+ per year', value: '75k', percentage: 18.9, description: '~18.9% of US women make $75k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$100k+ per year', value: '100k', percentage: 8.7, description: '~8.7% of US women make $100k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$150k+ per year', value: '150k', percentage: 4.3, description: '~4.3% of US women make $150k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$200k+ per year', value: '200k', percentage: 2.1, description: '~2.1% of US women make $200k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$300k+ per year', value: '300k', percentage: 0.8, description: '~0.8% of US women make $300k+ per year', source: 'US Census Bureau, 2023' },
        { label: '$500k+ per year', value: '500k', percentage: 0.3, description: '~0.3% of US women make $500k+ per year', source: 'US Census Bureau, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Education',
      description: 'Education levels vary by gender, race, and region',
      options: [],
      maleOptions: [
        { label: 'Any education', value: 'any', percentage: 100 },
        { label: 'College degree', value: 'college', percentage: 38.2, description: '~38.2% of US men have completed college', source: 'US Census Bureau, 2023' },
        { label: "Bachelor's degree", value: 'bachelors', percentage: 33.1, description: "~33.1% of US men have a bachelor's degree", source: 'US Census Bureau, 2023' },
        { label: "Master's degree", value: 'masters', percentage: 13.8, description: "~13.8% of US men have a master's degree", source: 'US Census Bureau, 2023' },
        { label: 'Doctorate/Professional', value: 'doctorate', percentage: 4.6, description: '~4.6% of US men have a doctorate or professional degree', source: 'US Census Bureau, 2023' },
      ],
      femaleOptions: [
        { label: 'Any education', value: 'any', percentage: 100 },
        { label: 'College degree', value: 'college', percentage: 42.3, description: '~42.3% of US women have completed college', source: 'US Census Bureau, 2023' },
        { label: "Bachelor's degree", value: 'bachelors', percentage: 37.1, description: "~37.1% of US women have a bachelor's degree", source: 'US Census Bureau, 2023' },
        { label: "Master's degree", value: 'masters', percentage: 15.6, description: "~15.6% of US women have a master's degree", source: 'US Census Bureau, 2023' },
        { label: 'Doctorate/Professional', value: 'doctorate', percentage: 4.2, description: '~4.2% of US women have a doctorate or professional degree', source: 'US Census Bureau, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Body Type',
      description: 'Body type distributions vary by gender, age, and ethnicity',
      options: [],
      maleOptions: [
        { label: 'Any body type', value: 'any', percentage: 100 },
        { label: 'Average weight', value: 'average', percentage: 28.7, description: '~28.7% of US men are normal/average weight', source: 'CDC, 2023' },
        { label: 'Athletic/Fit', value: 'athletic', percentage: 19.2, description: '~19.2% of US men maintain an athletic/fit physique', source: 'Multiple fitness studies, 2023' },
        { label: 'Very Athletic/Muscular', value: 'very-athletic', percentage: 4.3, description: 'Only ~4.3% of US men have very athletic/muscular builds', source: 'Fitness industry data, 2023' },
      ],
      femaleOptions: [
        { label: 'Any body type', value: 'any', percentage: 100 },
        { label: 'Average weight', value: 'average', percentage: 32.8, description: '~32.8% of US women are normal/average weight', source: 'CDC, 2023' },
        { label: 'Athletic/Fit', value: 'athletic', percentage: 15.3, description: '~15.3% of US women maintain an athletic/fit physique', source: 'Multiple fitness studies, 2023' },
        { label: 'Very Athletic/Toned', value: 'very-athletic', percentage: 3.2, description: 'Only ~3.2% of US women have very athletic/toned physiques', source: 'Fitness industry data, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Age',
      description: 'Age distributions vary by region',
      options: [
        { label: 'Any adult age', value: 'any', percentage: 100 },
        { label: '18-25', value: '18-25', percentage: 11.8, description: '~11.8% of US adults are 18-25', source: 'US Census Bureau, 2023' },
        { label: '25-35', value: '25-35', percentage: 17.9, description: '~17.9% of US adults are 25-35', source: 'US Census Bureau, 2023' },
        { label: '35-45', value: '35-45', percentage: 16.6, description: '~16.6% of US adults are 35-45', source: 'US Census Bureau, 2023' },
        { label: '45-55', value: '45-55', percentage: 15.3, description: '~15.3% of US adults are 45-55', source: 'US Census Bureau, 2023' },
        { label: '55-65', value: '55-65', percentage: 16.4, description: '~16.4% of US adults are 55-65', source: 'US Census Bureau, 2023' },
        { label: '65+', value: '65+', percentage: 22.0, description: '~22.0% of US adults are 65+', source: 'US Census Bureau, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Relationship History',
      description: 'Relationship history varies by age and region',
      options: [
        { label: 'Any relationship history', value: 'any', percentage: 100 },
        { label: 'Never married', value: 'never-married', percentage: 35.2, description: '~35.2% of US adults have never been married', source: 'Pew Research Center, 2023' },
        { label: 'No children', value: 'no-children', percentage: 41.5, description: '~41.5% of US adults do not have children', source: 'US Census Bureau, 2023' },
        { label: 'Never married & no children', value: 'never-married-no-children', percentage: 27.9, description: '~27.9% of US adults have never married and have no children', source: 'Calculated from Census data, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Religion',
      description: 'Religious affiliations vary significantly by region',
      options: [
        { label: 'Any religious affiliation', value: 'any', percentage: 100 },
        { label: 'Christian', value: 'christian', percentage: 63, description: '~63% of US adults identify as Christian', source: 'Pew Research, 2023' },
        { label: 'Protestant', value: 'protestant', percentage: 40, description: '~40% of US adults identify as Protestant', source: 'Pew Research, 2023' },
        { label: 'Catholic', value: 'catholic', percentage: 20, description: '~20% of US adults identify as Catholic', source: 'Pew Research, 2023' },
        { label: 'Jewish', value: 'jewish', percentage: 2.4, description: '~2.4% of US adults identify as Jewish', source: 'Pew Research, 2023' },
        { label: 'Muslim', value: 'muslim', percentage: 1.1, description: '~1.1% of US adults identify as Muslim', source: 'Pew Research, 2023' },
        { label: 'Buddhist/Hindu', value: 'buddhist-hindu', percentage: 1.8, description: '~1.8% of US adults identify as Buddhist or Hindu', source: 'Pew Research, 2023' },
        { label: 'Atheist/Agnostic', value: 'atheist-agnostic', percentage: 10.1, description: '~10.1% of US adults identify as Atheist or Agnostic', source: 'Pew Research, 2023' },
        { label: 'Non-religious', value: 'non-religious', percentage: 29, description: '~29% of US adults have no religious affiliation', source: 'Pew Research, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Political Views',
      description: 'Political views vary by region and demographic',
      options: [
        { label: 'Any political view', value: 'any', percentage: 100 },
        { label: 'Liberal/Progressive', value: 'liberal', percentage: 25.8, description: '~25.8% of US adults identify as liberal/progressive', source: 'Gallup Poll, 2023' },
        { label: 'Moderate', value: 'moderate', percentage: 36.4, description: '~36.4% of US adults identify as politically moderate', source: 'Gallup Poll, 2023' },
        { label: 'Conservative', value: 'conservative', percentage: 34.1, description: '~34.1% of US adults identify as conservative', source: 'Gallup Poll, 2023' },
        { label: 'Very Liberal', value: 'very-liberal', percentage: 9.4, description: '~9.4% of US adults identify as very liberal', source: 'Gallup Poll, 2023' },
        { label: 'Very Conservative', value: 'very-conservative', percentage: 12.6, description: '~12.6% of US adults identify as very conservative', source: 'Gallup Poll, 2023' },
      ],
      selected: null,
    },
    {
      name: 'Location Type',
      description: 'Urban/rural distributions vary by region',
      options: [
        { label: 'Any location type', value: 'any', percentage: 100 },
        { label: 'Urban', value: 'urban', percentage: 31.8, description: '~31.8% of US adults live in urban areas', source: 'US Census Bureau, 2023' },
        { label: 'Suburban', value: 'suburban', percentage: 51.4, description: '~51.4% of US adults live in suburban areas', source: 'US Census Bureau, 2023' },
        { label: 'Rural', value: 'rural', percentage: 16.8, description: '~16.8% of US adults live in rural areas', source: 'US Census Bureau, 2023' },
      ],
      selected: null,
    },
  ]);

  const [probability, setProbability] = useState<number>(100);
  const [peopleCount, setPeopleCount] = useState<number>(adultPopulation * 1000000);
  const [realDatingPoolSize, setRealDatingPoolSize] = useState<number>(0);
  const [delusion, setDelusion] = useState<string>('');
  const [lookingForMale, setLookingForMale] = useState<boolean>(true);
  const [confidenceLevel, setConfidenceLevel] = useState<string>('moderate');
  const [marginOfError, setMarginOfError] = useState<number>(0);

  const calculateRaceCorrelations = (race: string, trait: string, percentage: number): number => {
    if (race === 'any' || trait === 'any') return percentage;

    const correlations: Record<string, Record<string, number>> = {
      white: {
        blonde: 1.8,
        blue: 1.9,
        green: 1.4,
        red: 2.2,
        '6-0': 1.1,
        athletic: 1.05,
        'very-athletic': 1.05,
      },
      black: {
        blonde: 0.01,
        blue: 0.02,
        green: 0.03,
        red: 0.01,
        gray: 0.04,
        '6-0': 1.15,
        '6-2': 1.25,
        athletic: 1.1,
        'very-athletic': 1.2,
      },
      asian: {
        blonde: 0.001,
        blue: 0.001,
        green: 0.001,
        red: 0.001,
        gray: 0.001,
        '6-0': 0.3,
        '6-2': 0.2,
        '6-4': 0.1,
        '6-5': 0.05,
      },
      hispanic: {
        blonde: 0.15,
        blue: 0.1,
        green: 0.2,
        red: 0.05,
        gray: 0.05,
        '6-0': 0.6,
        '6-2': 0.4,
      },
    };

    if (correlations[race] && correlations[race][trait]) {
      return percentage * correlations[race][trait];
    }

    return percentage;
  };

  const getGlobalAdjustment = (criterion: string): number => {
    if (region === 'us') return 1.0;

    const adjustments: Record<string, Record<string, number>> = {
      global: {
        blonde: 0.31,
        blue: 0.28,
        green: 0.29,
        gray: 0.3,
        red: 0.4,
        '6-0': 0.65,
        '6-2': 0.5,
        '6-4': 0.35,
        '6-5': 0.25,
        '5-10-female': 0.35,
        '5-8-female': 0.5,
        college: 0.55,
        bachelors: 0.45,
        masters: 0.3,
        doctorate: 0.25,
        '100k': 0.25,
        '150k': 0.15,
        '200k': 0.08,
        '300k': 0.04,
        '500k': 0.02,
        athletic: 0.85,
        'very-athletic': 0.7,
      },
      'western-europe': {
        blonde: 1.8,
        blue: 1.7,
        green: 1.3,
        gray: 1.5,
        red: 1.4,
        '6-0': 1.1,
        '6-2': 0.9,
        '6-4': 0.7,
        college: 0.9,
        bachelors: 0.75,
        masters: 0.65,
        doctorate: 0.55,
        '100k': 0.5,
        '150k': 0.35,
        '200k': 0.25,
        '300k': 0.15,
        '500k': 0.1,
        athletic: 0.9,
        'very-athletic': 0.8,
      },
      'east-asia': {
        blonde: 0.001,
        blue: 0.001,
        green: 0.001,
        gray: 0.001,
        red: 0.001,
        '6-0': 0.2,
        '6-2': 0.08,
        '6-4': 0.02,
        '6-5': 0.01,
        college: 0.85,
        bachelors: 0.75,
        masters: 0.6,
        doctorate: 0.5,
        '100k': 0.15,
        '150k': 0.08,
        '200k': 0.05,
        '300k': 0.02,
        '500k': 0.01,
        athletic: 0.7,
        'very-athletic': 0.5,
      },
      'south-asia': {
        blonde: 0.001,
        blue: 0.001,
        green: 0.01,
        gray: 0.001,
        red: 0.001,
        '6-0': 0.15,
        '6-2': 0.05,
        '6-4': 0.01,
        '6-5': 0.005,
        college: 0.4,
        bachelors: 0.3,
        masters: 0.2,
        doctorate: 0.1,
        '100k': 0.08,
        '150k': 0.04,
        '200k': 0.02,
        '300k': 0.01,
        '500k': 0.005,
        athletic: 0.5,
        'very-athletic': 0.3,
      },
      'latin-america': {
        blonde: 0.08,
        blue: 0.1,
        green: 0.15,
        gray: 0.05,
        red: 0.03,
        '6-0': 0.4,
        '6-2': 0.2,
        '6-4': 0.05,
        '6-5': 0.02,
        college: 0.35,
        bachelors: 0.25,
        masters: 0.15,
        doctorate: 0.08,
        '100k': 0.1,
        '150k': 0.05,
        '200k': 0.02,
        '300k': 0.01,
        '500k': 0.005,
        athletic: 0.7,
        'very-athletic': 0.5,
      },
      africa: {
        blonde: 0.005,
        blue: 0.005,
        green: 0.01,
        gray: 0.003,
        red: 0.001,
        '6-0': 0.6,
        '6-2': 0.4,
        '6-4': 0.15,
        '6-5': 0.08,
        college: 0.25,
        bachelors: 0.18,
        masters: 0.08,
        doctorate: 0.03,
        '100k': 0.05,
        '150k': 0.02,
        '200k': 0.01,
        '300k': 0.003,
        '500k': 0.001,
        athletic: 0.6,
        'very-athletic': 0.4,
      },
    };

    const regionAdjustments = adjustments[region];
    if (regionAdjustments && regionAdjustments[criterion]) {
      return regionAdjustments[criterion];
    }

    return 1.0;
  };

  const checkTraitCorrelations = (selectedTraits: string[]): number => {
    let correctionFactor = 1.0;

    if (selectedTraits.includes('blonde') && selectedTraits.includes('blue')) {
      correctionFactor *= 3.7;
    }

    if (selectedTraits.includes('blonde') && selectedTraits.includes('green')) {
      correctionFactor *= 2.1;
    }

    if (selectedTraits.includes('red') && selectedTraits.includes('green')) {
      correctionFactor *= 2.3;
    }

    if (selectedTraits.includes('masters') && (selectedTraits.includes('100k') || selectedTraits.includes('150k'))) {
      correctionFactor *= 1.8;
    }

    if (selectedTraits.includes('doctorate') && (selectedTraits.includes('150k') || selectedTraits.includes('200k'))) {
      correctionFactor *= 2.5;
    }

    if (selectedTraits.includes('very-athletic') && selectedTraits.includes('6-0')) {
      correctionFactor *= 1.4;
    }

    if (selectedTraits.includes('athletic') && selectedTraits.includes('50k')) {
      correctionFactor *= 1.3;
    }

    return correctionFactor;
  };

  const calculateMarginOfError = (probability: number, factorCount: number): number => {
    const baseError = 0.1 + factorCount * 0.05;

    if (probability < 0.00001) return Math.min(0.95, baseError * 5);
    if (probability < 0.0001) return Math.min(0.9, baseError * 4);
    if (probability < 0.001) return Math.min(0.8, baseError * 3);
    if (probability < 0.01) return Math.min(0.7, baseError * 2);
    if (probability < 0.1) return Math.min(0.6, baseError * 1.5);

    return baseError;
  };

  useEffect(() => {
    setCriteria((prevCriteria) =>
      prevCriteria.map((criterion) => {
        if (criterion.maleOptions && criterion.femaleOptions) {
          return {
            ...criterion,
            options: lookingForMale ? criterion.maleOptions : criterion.femaleOptions,
            selected: null,
          };
        }
        return criterion;
      })
    );
  }, [lookingForMale]);

  useEffect(() => {
    let totalProbability = 100;
    let adjustedConfidence = 'high';
    let factorCount = 0;
    let selectedTraits: string[] = [];
    let selectedRace = 'any';

    if (lookingForMale) {
      totalProbability = 49;
    } else {
      totalProbability = 51;
    }

    criteria.forEach((criterion) => {
      if (criterion.selected && criterion.selected !== 'any') {
        const selectedOption = criterion.options.find((opt) => opt.value === criterion.selected);

        if (selectedOption) {
          let adjustedPercentage = selectedOption.percentage;

          if (criterion.name === 'Race/Ethnicity') {
            selectedRace = selectedOption.value;
          } else {
            adjustedPercentage = calculateRaceCorrelations(selectedRace, selectedOption.value, adjustedPercentage);

            if (region !== 'us') {
              const genderSpecificTrait =
                !lookingForMale && (selectedOption.value === '5-10' || selectedOption.value === '5-8')
                  ? `${selectedOption.value}-female`
                  : selectedOption.value;

              const adjustment = getGlobalAdjustment(genderSpecificTrait);
              adjustedPercentage = adjustedPercentage * adjustment;

              if (adjustment !== 1.0) {
                adjustedConfidence = 'low';
              }
            }

            selectedTraits.push(selectedOption.value);
          }

          totalProbability = (totalProbability * adjustedPercentage) / 100;
          factorCount++;
        }
      }
    });

    const correlationCorrection = checkTraitCorrelations(selectedTraits);
    totalProbability *= correlationCorrection;

    if (factorCount > 3) adjustedConfidence = 'moderate';
    if (factorCount > 5) adjustedConfidence = 'low';
    if (factorCount > 7) adjustedConfidence = 'very low';

    if (totalProbability < 0.001) adjustedConfidence = 'very low';

    const errorMargin = calculateMarginOfError(totalProbability, factorCount);
    setMarginOfError(errorMargin);

    setProbability(totalProbability);
    setPeopleCount((totalProbability / 100) * adultPopulation * 1000000);
    setConfidenceLevel(adjustedConfidence);

    const inRelationshipPercentage = region === 'us' ? 0.53 : 0.58;
    setRealDatingPoolSize((totalProbability / 100) * adultPopulation * 1000000 * (1 - inRelationshipPercentage));

    if (totalProbability < 0.00001) {
      setDelusion('VIRTUALLY IMPOSSIBLE');
    } else if (totalProbability < 0.0001) {
      setDelusion('COMPLETELY DELUSIONAL');
    } else if (totalProbability < 0.001) {
      setDelusion('EXTREMELY DELUSIONAL');
    } else if (totalProbability < 0.01) {
      setDelusion('VERY DELUSIONAL');
    } else if (totalProbability < 0.1) {
      setDelusion('DELUSIONAL');
    } else if (totalProbability < 0.5) {
      setDelusion('SOMEWHAT DELUSIONAL');
    } else if (totalProbability < 1) {
      setDelusion('CHALLENGING');
    } else if (totalProbability < 5) {
      setDelusion('DIFFICULT BUT POSSIBLE');
    } else {
      setDelusion('REALISTIC');
    }
  }, [criteria, lookingForMale, adultPopulation, region]);

  const handleCriterionChange = (criterionName: string, value: string) => {
    setCriteria((prevCriteria) =>
      prevCriteria.map((criterion) => (criterion.name === criterionName ? { ...criterion, selected: value } : criterion))
    );
  };

  const formatNumber = (num: number): string => {
    if (num < 1) {
      return num.toFixed(8).replace(/\.?0+$/, '');
    }

    if (num < 0.000001) {
      return num.toExponential(2);
    }

    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const resetSelections = () => {
    setCriteria((prevCriteria) => prevCriteria.map((criterion) => ({ ...criterion, selected: null })));
  };

  const calculateTopPercentile = (): string => {
    if (probability >= 10) return '';

    const percentile = 100 - probability;
    if (percentile > 99.99999) return 'top 0.00001%';
    if (percentile > 99.9999) return 'top 0.0001%';
    if (percentile > 99.999) return 'top 0.001%';
    if (percentile > 99.99) return 'top 0.01%';
    if (percentile > 99.9) return 'top 0.1%';
    if (percentile > 99) return 'top 1%';
    if (percentile > 95) return 'top 5%';
    return `top ${Math.round(100 - probability)}%`;
  };

  const getConfidenceLevelColor = () => {
    switch (confidenceLevel) {
      case 'high':
        return 'text-green-400';
      case 'moderate':
        return 'text-yellow-400';
      case 'low':
        return 'text-orange-400';
      case 'very low':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">

        <Helmet>
            <title>Dating Pool Reality Calculator | Demographic-Based Match Estimation</title>
            <meta
                name="description"
                content="Estimate your dating pool with our calculator using 2023-2024 demographic data. Filter by race, height, income, and more to see your match percentage."
            />
            <meta
                name="keywords"
                content="dating calculator, demographic data, match estimation, dating pool, population percentage, race, height, income, education, body type, age, relationship history, religion, political views, location type"
            />
            <meta property="og:title" content="Dating Pool Reality Calculator" />
            <meta
                property="og:description"
                content="Estimate your dating pool based on demographic data. Select criteria like race, height, income, and more to see your match percentage."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://checkredflag.com/calculator" />
            <meta property="og:image" content="https://checkredflag.com/og-image-calculator.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Dating Pool Reality Calculator",
            "description": "A tool to estimate the percentage of the population that matches your dating criteria based on 2023-2024 demographic data.",
            "url": "https://checkredflag.com/calculator",
            "applicationCategory": "Lifestyle",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
        </Helmet>

      <Header viewMode="edit" setViewMode={() => {}} />

      <main className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Dating Pool Reality Calculator</h1>
            <p className="text-gray-400 mb-4">
                Use our free Dating Pool Reality Calculator to estimate the percentage of the population that matches your dating preferences based on 2023-2024 demographic data. Select criteria such as race, height, income, education, and more to see how your choices shape your potential dating pool.
            </p>
            <p className="text-gray-400 mb-4">
                This tool leverages data from trusted sources like the U.S. Census Bureau, CDC, and Pew Research Center, incorporating racial correlations and cross-trait adjustments for improved accuracy. Results are approximate and intended for informational purposes.
            </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30">
          <div className="p-4 flex items-start gap-3">
            <div className="flex-shrink-0 mt-1 text-yellow-300">⚠️</div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-yellow-300">Statistical Accuracy Disclaimer</h3>
                <button
                  onClick={() => setDisclaimerExpanded(!disclaimerExpanded)}
                  className="text-xs px-2 py-1 rounded border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors"
                >
                  {disclaimerExpanded ? 'Show Less' : 'Read More'}
                </button>
              </div>
              <p className="text-gray-300 mt-1">
                The statistics used in this calculator have significant limitations and should be considered approximations.
              </p>
              {disclaimerExpanded && (
                <div className="mt-3 space-y-2 text-sm text-gray-300 border-t border-gray-600 pt-3">
                  <p>
                    <strong className="text-yellow-300">Census Error Margins:</strong> Official census data typically includes margins of error of ±1-3%. Recent demographic shifts may not be reflected in latest published data.
                  </p>
                  <p>
                    <strong className="text-yellow-300">Sample Size Limitations:</strong> Many demographic statistics are derived from studies with limited sample sizes that may not fully represent the entire population.
                  </p>
                  <p>
                    <strong className="text-yellow-300">Statistical Independence:</strong> This calculator assumes traits are statistically independent (e.g., height isn’t correlated with ethnicity), which is often not the case in real populations.
                  </p>
                  <p>
                    <strong className="text-yellow-300">Regional Variations:</strong> Statistics can vary dramatically between geographic regions, even within the same country.
                  </p>
                  <p>
                    <strong className="text-yellow-300">Self-Reporting Biases:</strong> Some data relies on self-reported information (e.g., income, body type) which may contain inherent biases.
                  </p>
                  <p>
                    <strong className="text-yellow-300">Purpose:</strong> This calculator is intended to illustrate the statistical rarity of specific combinations of traits, not to provide precise scientific measurements. Results should be interpreted as rough estimates.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700/50">
          <h2 className="text-lg font-semibold mb-2 text-white">Geographic Region</h2>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {regionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {region !== 'us' && (
            <p className="mt-2 text-yellow-300 text-sm">
              ⚠️ Non-US statistics include region-specific adjustments with lower confidence levels.
            </p>
          )}
        </div>

        <div className="mb-6 p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700/50">
          <h2 className="text-lg font-semibold mb-2 text-white">Gender Preference</h2>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                checked={lookingForMale}
                onChange={() => setLookingForMale(true)}
                className="form-radio h-5 w-5 text-blue-500"
                name="gender"
              />
              <span className="ml-2 text-gray-300">Looking for men</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                checked={!lookingForMale}
                onChange={() => setLookingForMale(false)}
                className="form-radio h-5 w-5 text-pink-500"
                name="gender"
              />
              <span className="ml-2 text-gray-300">Looking for women</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {criteria.map((criterion) => (
            <div
                key={criterion.name}
                className="p-4 bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl border border-gray-700/50"
            >
                <label
                htmlFor={criterion.name}
                className="text-lg font-semibold mb-2 text-white flex items-center justify-between"
                >
                {criterion.name}
                {criterion.description && (
                    <span className="text-xs text-gray-400 italic ml-2">{criterion.description}</span>
                )}
                </label>
                <select
                id={criterion.name}
                value={criterion.selected || ''}
                onChange={(e) => handleCriterionChange(criterion.name, e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                <option value="">Select a preference</option>
                {criterion.options.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </select>
                {criterion.selected && criterion.selected !== 'any' && (
                <div className="mt-2 text-sm text-gray-400">
                    {criterion.options.find((o) => o.value === criterion.selected)?.description}
                </div>
                )}
            </div>
            ))}
        </div>

        <div className="mb-6 p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Results</h2>
          <div
            className={`text-3xl font-bold mb-4 ${
              delusion === 'REALISTIC'
                ? 'text-green-400'
                : delusion === 'DIFFICULT BUT POSSIBLE'
                ? 'text-yellow-400'
                : delusion === 'CHALLENGING'
                ? 'text-orange-400'
                : 'text-red-400'
            }`}
          >
            {delusion}
          </div>
          <div className="mb-4">
            <p className="text-gray-300">
              Only{' '}
              <span className="font-bold text-blue-300">
                {probability < 0.00001 ? '< 0.00001' : probability.toFixed(6)}%
              </span>{' '}
              of the population matches all your criteria
            </p>
            {calculateTopPercentile() && (
              <p className="text-gray-300 mt-1">
                You’re looking for someone in the{' '}
                <span className="font-bold text-pink-300">{calculateTopPercentile()}</span> of people
              </p>
            )}
            <p className="text-gray-300 mt-1">
              That’s approximately{' '}
              <span className="font-bold text-green-300">{formatNumber(peopleCount)}</span> people in{' '}
              {region === 'us' ? 'the U.S.' : 'your selected region'}
            </p>
            <p className="text-gray-300 mt-1">
              Accounting for people already in relationships, your actual dating pool is roughly{' '}
              <span className="font-bold text-amber-300">{formatNumber(realDatingPoolSize)}</span> people
            </p>
            <div className="mt-3 text-xs">
              <span className="text-gray-400">Statistical confidence level: </span>
              <span className={`font-medium ${getConfidenceLevelColor()}`}>{confidenceLevel.toUpperCase()}</span>
              <span className="text-gray-400 ml-2">(Estimated margin of error: ±{Math.round(marginOfError * 100)}%)</span>
            </div>
            {peopleCount < 10000 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 rounded-xl border border-yellow-500/30">
                <p className="text-yellow-300">
                  ⚠️ The pool of people matching your criteria is extremely small.
                </p>
                <p className="text-yellow-300 mt-1 text-sm">
                  Given geographic limitations, mutual attraction, and other factors, finding a compatible match with these exact criteria would be challenging.
                </p>
              </div>
            )}
            {probability < 0.0001 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-xl border border-red-500/30">
                <p className="text-red-300">
                  ⚠️ Your criteria are so restrictive that a match is statistically improbable.
                </p>
                <p className="text-red-300 mt-1 text-sm">
                  If you applied these criteria globally to the 8 billion people on Earth, there would be approximately{' '}
                  {formatNumber((probability / 100) * 8000 * 1000000 * 0.76)} people who match, with most already in relationships.
                </p>
              </div>
            )}
          </div>
          <button
            onClick={resetSelections}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
          >
            Reset All
          </button>
        </div>

        <div className="text-sm text-gray-400 text-center">
          <p className="mb-1">Based on 2023-2024 demographic data from Census Bureau, CDC, Pew Research, and other sources.</p>
          <p className="italic text-gray-500">
            Note: This calculator includes racial correlations and cross-trait adjustments for more accuracy, but remains an approximation.
          </p>
        </div>
      </main>
    <Footer />

    </div>
  );
};

export default CalculatorPage;