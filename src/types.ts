import { ReactNode } from 'react';

export interface CategoryData {
  flags: string[];
  icon: ReactNode;
  color: string;
}

export interface TraitDefinition {
  trait: string;
  negative: string;
  positive: string;
  negativeWeight: number;
  positiveWeight: number;
}

export interface CategoryTraits {
  [category: string]: TraitDefinition[];
}

export interface SpectrumLevel {
  value: string;
  label: string;
  color: string;
}

export interface RelationshipScores {
  redScore: number;
  greenScore: number;
  netScore: number;
}

export interface RiskLevel {
  level: 'low' | 'moderate' | 'high';
  message: string;
  color: string;
}

export interface RelationshipVerdict {
  title: string;
  description: string;
  color: string;
  emoji: string;
}

export type TraitSelections = Record<string, string>;