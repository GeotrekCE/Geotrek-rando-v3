import { DISTRICT_ID } from '../constant';
import { FilterWithoutType } from '../interface';
import { RawDistrict } from './interface';

export const adaptDistrictFilter = (rawDistricts: RawDistrict[]): FilterWithoutType => ({
  id: DISTRICT_ID,
  options: rawDistricts.map(rawDistrict => ({
    value: `${rawDistrict.id}`,
    label: rawDistrict.name,
  })),
});
