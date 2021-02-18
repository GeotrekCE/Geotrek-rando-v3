import { Choices, FilterWithoutType } from '../interface';
import { Theme } from './interface';
import { adaptTheme, adaptThemeFilter, adaptThemes } from './adapter';
import { fetchTheme, fetchThemes } from './api';

export const getTheme = async (id: number, language: string): Promise<Theme> => {
  const rawTheme = await fetchTheme({ language }, id);
  return adaptTheme(rawTheme);
};

export const getThemeFilter = async (language: string): Promise<FilterWithoutType> => {
  const rawThemeFilter = await fetchThemes({ language });
  return adaptThemeFilter(rawThemeFilter.results);
};

export const getThemes = async (language: string): Promise<Choices> => {
  const rawThemes = await fetchThemes({ language });
  return adaptThemes(rawThemes.results);
};
