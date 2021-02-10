import { CITY_ID } from '../constant';
import { FilterWithoutType } from '../interface';
import { RawCity } from './interface';

export const adaptCityFilter = (rawCities: RawCity[]): FilterWithoutType => ({
  id: CITY_ID,
  options: rawCities.map(rawCity => ({
    value: rawCity.id,
    label: rawCity.name,
  })),
});
