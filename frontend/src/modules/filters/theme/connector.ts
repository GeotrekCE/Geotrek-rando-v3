import { adaptThemeFilter } from './adapter';
import { fetchThemes } from './api';

export const getThemeFilter = async () => {
  const rawCities = await fetchThemes({ language: 'fr' });
  return adaptThemeFilter(rawCities.results);
};
