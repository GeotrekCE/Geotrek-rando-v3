import { adaptCityFilter } from './adapter';
import { fetchCities } from './api';

export const getCityFilter = async () => {
  const rawCities = await fetchCities({ language: 'fr' });
  return adaptCityFilter(rawCities.results);
};
