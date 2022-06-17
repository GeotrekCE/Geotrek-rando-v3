import { adaptInfrastructureType } from './adapter';
import { fetchInfrastructureType } from './api';
import { InfrastructureTypeDictionary } from './interface';

export const getInfrastructureType = async (
  language: string,
): Promise<InfrastructureTypeDictionary> => {
  const rawInfrastructureType = await fetchInfrastructureType({ language });

  return adaptInfrastructureType(rawInfrastructureType.results);
};
