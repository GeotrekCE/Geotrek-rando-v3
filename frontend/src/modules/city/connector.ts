import { adaptCities } from './adapter';
import { fetchCities } from './api';
import { CityDictionnary } from './interface';

export const getCities = async (): Promise<CityDictionnary> => {
  const rawCities = await fetchCities({ language: 'fr' });
  return adaptCities(rawCities.results);
};
