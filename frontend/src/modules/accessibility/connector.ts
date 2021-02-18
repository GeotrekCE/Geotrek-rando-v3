import { adaptAccessibilities } from './adapter';
import { fetchAccessibilities } from './api';
import { AccessibilityDictionnary } from './interface';

export const getAccessibilities = async (language: string): Promise<AccessibilityDictionnary> => {
  const rawAccessibilities = await fetchAccessibilities({ language });
  return adaptAccessibilities(rawAccessibilities.results);
};
