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
  label: string;
  value: string;
  pictogramUrl?: string;
}
export interface Filter {
  id: string;
  options: Option[];
}

export interface FilterConfig {
  id: string;
  options: undefined;
}

export interface FilterConfigWithOptions {
  id: string;
  options: {
    minValue: number;
    maxValue: number;
    label: string;
  }[];
}

export interface FilterState {
  id: string;
  label: string;
  options: Option[];
  selectedOptions: Option[];
}
