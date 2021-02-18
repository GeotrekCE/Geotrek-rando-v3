import { adaptDistrictFilter } from './adapter';
import { fetchDistricts } from './api';

export const getDistrictFilter = async (language: string) => {
  const rawDistricts = await fetchDistricts({ language });
  return adaptDistrictFilter(rawDistricts.results);
};
