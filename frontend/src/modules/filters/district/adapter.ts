import { Filter } from '../interface';
import { RawDistrict } from './interface';

export const adaptDistrictFilter = (rawDistricts: RawDistrict[]): Filter => ({
  id: 'district',
  options: rawDistricts.map(rawDistrict => ({
    value: rawDistrict.id,
    label: rawDistrict.name,
  })),
});
