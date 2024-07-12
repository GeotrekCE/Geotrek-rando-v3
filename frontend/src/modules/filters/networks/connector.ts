import { FilterWithoutType } from '../interface';
import { adaptNetworksFilter } from './adapter';
import { fetchNetworks } from './api';

export const getNetworksFilter = async (language: string): Promise<FilterWithoutType | null> => {
  let results = null;
  try {
    const rawNetworks = await fetchNetworks({ language });
    results = rawNetworks.results;
  } catch (e) {
    // error
  }
  return adaptNetworksFilter(results);
};
