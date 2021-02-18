import { fetchAccessibilities } from './api';
import { adaptAccessibilityFilter } from './adapter';

export const getAccessibilityFilter = async (language: string) => {
  const rawAccessibilities = await fetchAccessibilities({ language });
  return adaptAccessibilityFilter(rawAccessibilities.results);
};
