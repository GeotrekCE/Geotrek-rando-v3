import { Choices } from '../interface';
import { adaptThemeFilter, adaptThemes } from './adapter';
import { fetchThemes } from './api';

export const getThemeFilter = async () => {
  const rawThemeFilter = await fetchThemes({ language: 'fr' });
  return adaptThemeFilter(rawThemeFilter.results);
};

export const getThemes = async (): Promise<Choices> => {
  const rawThemes = await fetchThemes({ language: 'fr' });
  return adaptThemes(rawThemes.results);
};
