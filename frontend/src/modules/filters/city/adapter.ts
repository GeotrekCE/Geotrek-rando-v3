import { FilterWithoutType } from '../interface';
import { RawCity } from './interface';

export const adaptCityFilter = (rawCities: RawCity[]): FilterWithoutType => ({
  id: 'city',
  options: rawCities.map(rawCity => ({
    value: rawCity.id,
    label: rawCity.name,
  })),
});
