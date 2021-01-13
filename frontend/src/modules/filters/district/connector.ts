import { adaptDistrictFilter } from './adapter';
import { fetchDistricts } from './api';

export const getDistrictFilter = async () => {
  const rawDistricts = await fetchDistricts({ language: 'fr' });
  return adaptDistrictFilter(rawDistricts.results);
};
