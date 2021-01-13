import { fetchAccessibilities } from './api';
import { adaptAccessibilityFilter } from './adapter';

export const getAccessibilityFilter = async () => {
  const rawAccessibilities = await fetchAccessibilities({ language: 'fr' });
  return adaptAccessibilityFilter(rawAccessibilities.results);
};
