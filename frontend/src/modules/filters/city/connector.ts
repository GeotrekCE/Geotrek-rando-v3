import { adaptCityFilter } from './adapter';
import { fetchCities } from './api';

export const getCityFilter = async (language: string) => {
  const rawCities = await fetchCities({ language });
  return adaptCityFilter(rawCities.results);
};
