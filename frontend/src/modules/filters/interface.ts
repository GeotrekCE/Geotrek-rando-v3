import React from 'react';

export interface Choices {
  [value: string]: {
    label: string;
  };
}

// Individual filters interfaces

export interface RawDifficulty {
  id: number;
  cirkwi_level: number;
  label: string;
  pictogram: string;
}

interface RawRangeChoice {
  minValue: number;
  maxValue: number;
  label: string;
}

export interface RawDuration {
  status: string;
  source: string;
  choices: RawRangeChoice[];
}

// Config file interface

export interface Option {
  label?: string;
  value: string;
  pictogramUrl?: string;
  include?: boolean;
  translatedKey?: string;
}

export interface FilterWithoutType {
  id: string;
  options: Option[];
  withExclude?: boolean;
}
export interface Filter extends FilterWithoutType {
  type: 'SINGLE' | 'MULTIPLE';
}

export interface FilterConfig {
  id: string;
  display?: boolean;
  type: 'SINGLE' | 'MULTIPLE';
  options: undefined;
  withExclude?: boolean;
}

export interface FilterConfigWithOptions {
  id: string;
  type: 'SINGLE' | 'MULTIPLE';
  display?: boolean;
  options: {
    minValue: number;
    maxValue: number;
    label?: string;
    translatedKey?: string;
  }[];
  withExclude?: boolean;
}

export interface FilterState {
  id: string;
  label: string;
  category?: string;
  type: 'SINGLE' | 'MULTIPLE';
  options: Option[];
  selectedOptions: Option[];
}

export interface FilterCategory {
  id: string;
  name: React.ReactElement | React.ReactElement[];
  filters?: string[];
  subFilters?: string[] | string[][];
  onSelect?: () => void;
}

export interface DateFilter {
  beginDate: string;
  endDate: string;
}
