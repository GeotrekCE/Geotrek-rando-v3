import { City, CityDictionnary, RawCity } from './interface';

const adaptCity = (rawCity: RawCity): City => ({
  name: rawCity.name,
  id: rawCity.id,
});

export const adaptCities = (rawCities: RawCity[]): CityDictionnary =>
  rawCities.reduce(
    (cities, currentCity) => ({
      ...cities,
      [`${currentCity.id}`]: adaptCity(currentCity),
    }),
    {},
  );
