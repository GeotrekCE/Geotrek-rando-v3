import { CityDictionnary, RawCity } from './interface';

export const adaptCities = (rawCities: RawCity[]): CityDictionnary =>
  Object.fromEntries(rawCities.map(city => [city.id, city]));
