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

// types.ts - Central type definitions for your app
import React from 'react';

// Trait-related types
export interface TraitOption {
  value: string;
  label: string;
  impact?: number;
}

export interface TraitDefinition {
  trait: string;
  negative: string;
  positive: string;
  negativeWeight: number;
  positiveWeight: number;
  isCustom?: boolean;
  createdAt?: number;
}

export interface CustomTraitDefinition extends TraitDefinition {
  isCustom: true;
  createdAt: number;
}

export interface Trait {
  id: string;
  title: string;
  description?: string;
  options: TraitOption[];
}

export interface Category {
  id: string;
  name: string;
  traits: Trait[];
}

export interface CustomTraits {
  [category: string]: CustomTraitDefinition[];
}

export interface NavigationOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface ProfileModalProps {
  newProfileName: string;
  setNewProfileName: (name: string) => void;
  setShowProfileModal: (show: boolean) => void;
  addNewProfile: () => void;
  isMobile?: boolean;
}

export interface CustomFlagModalProps {
  customFlag: string;
  setCustomFlag: (flag: string) => void;
  customCategory: string;
  setCustomCategory: (category: string) => void;
  setShowCustomFlagModal: (show: boolean) => void;
  addCustomFlag: () => void;
  categoryData: any; 
  isMobile?: boolean;
}

export interface ShareModalProps {
  shareableLink: string;
  copied: boolean;
  setShowShareModal: (show: boolean) => void;
  copyToClipboard: () => void;
  downloadAsImage: () => void;
  isMobile?: boolean;
}

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  type?: "default" | "red" | "green" | "warning";
}

export interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  options: NavigationOption[];
}

export interface FloatingActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}