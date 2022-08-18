import { FilterWithoutType } from '../interface';
import { adaptDistrictFilter } from './adapter';
import { fetchDistricts } from './api';

export const getDistrictFilter = async (language: string): Promise<FilterWithoutType> => {
  const rawDistricts = await fetchDistricts({ language });
  return adaptDistrictFilter(rawDistricts.results);
};
