import { FilterWithoutType } from '../interface';
import { adaptOrganizerFilter } from './adapter';
import { fetchOrganizer } from './api';

export const getOrganizerFilter = async (language: string): Promise<FilterWithoutType | null> => {
  let results = null;
  try {
    const rawOrganizer = await fetchOrganizer({ language });
    results = rawOrganizer.results;
  } catch (e) {
    // error
  }
  return adaptOrganizerFilter(results);
};
