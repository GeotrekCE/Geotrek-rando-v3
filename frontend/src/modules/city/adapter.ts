import { APIResponseForList } from 'services/api/interface';
import { concatResults } from '../utils/adapter';
import { City, CityDictionnary, RawCity } from './interface';

const adaptCity = (rawCity: RawCity): City => ({
  name: rawCity.name,
  id: rawCity.id,
});

export const adaptCitiesSinglePage = (rawCities: RawCity[]): CityDictionnary =>
  rawCities.reduce(
    (cities, currentCity) => ({
      ...cities,
      [`${currentCity.id}`]: adaptCity(currentCity),
    }),
    {},
  );

export const adaptCities = (rawCities: APIResponseForList<RawCity>[]): CityDictionnary =>
  concatResults<RawCity>(rawCities).reduce(
    (cities, currentCity) => ({
      ...cities,
      [`${currentCity.id}`]: adaptCity(currentCity),
    }),
    {},
  );
