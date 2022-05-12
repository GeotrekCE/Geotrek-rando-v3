import { adaptSignageType } from './adapter';
import { fetchSignageType } from './api';
import { SignageTypeDictionary } from './interface';

export const getSignageType = async (language: string): Promise<SignageTypeDictionary> => {
  const rawSignageType = await fetchSignageType({ language });

  return adaptSignageType(rawSignageType.results);
};
