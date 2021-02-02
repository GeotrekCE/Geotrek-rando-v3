import { adaptAccessibilities } from './adapter';
import { fetchAccessibilities } from './api';
import { AccessibilityDictionnary } from './interface';

export const getAccessibilities = async (): Promise<AccessibilityDictionnary> => {
  const rawAccessibilities = await fetchAccessibilities({ language: 'fr' });
  return adaptAccessibilities(rawAccessibilities.results);
};
