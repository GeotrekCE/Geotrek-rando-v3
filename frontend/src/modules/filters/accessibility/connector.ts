import { fetchAccessibilities } from './api';
import { adaptAccessibilityFilter } from './adapter';
import { FilterWithoutType } from '../interface';

export const getAccessibilityFilter = async (language: string): Promise<FilterWithoutType> => {
  const rawAccessibilities = await fetchAccessibilities({ language });
  return adaptAccessibilityFilter(rawAccessibilities.results);
};
