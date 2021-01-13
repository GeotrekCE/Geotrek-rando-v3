import { adaptThemeFilter } from './adapter';
import { fetchThems } from './api';

export const getThemeFilter = async () => {
  const rawCities = await fetchThems({ language: 'fr' });
  return adaptThemeFilter(rawCities.results);
};
