import { Choices } from '../interface';
import { Theme } from './interface';
import { adaptTheme, adaptThemeFilter, adaptThemes } from './adapter';
import { fetchTheme, fetchThemes } from './api';

export const getTheme = async (id: number): Promise<Theme> => {
  const rawTheme = await fetchTheme({ language: 'fr' }, id);
  return adaptTheme(rawTheme);
};

export const getThemeFilter = async () => {
  const rawThemeFilter = await fetchThemes({ language: 'fr' });
  return adaptThemeFilter(rawThemeFilter.results);
};

export const getThemes = async (): Promise<Choices> => {
  const rawThemes = await fetchThemes({ language: 'fr' });
  return adaptThemes(rawThemes.results);
};
