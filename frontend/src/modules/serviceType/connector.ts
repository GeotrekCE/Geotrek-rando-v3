import { adaptServiceType } from './adapter';
import { fetchServiceType } from './api';
import { ServiceTypeDictionary } from './interface';

export const getServiceType = async (language: string): Promise<ServiceTypeDictionary> => {
  const rawServiceType = await fetchServiceType({ language });

  return adaptServiceType(rawServiceType.results);
};
