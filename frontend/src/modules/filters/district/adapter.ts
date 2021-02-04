import { FilterWithoutType } from '../interface';
import { RawDistrict } from './interface';

export const adaptDistrictFilter = (rawDistricts: RawDistrict[]): FilterWithoutType => ({
  id: 'district',
  options: rawDistricts.map(rawDistrict => ({
    value: rawDistrict.id,
    label: rawDistrict.name,
  })),
});
