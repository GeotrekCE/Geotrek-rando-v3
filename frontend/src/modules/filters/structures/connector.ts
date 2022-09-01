import { FilterWithoutType } from '../interface';
import { adaptStructureFilter } from './adapter';
import { fetchStructures } from './api';

export const getStructureFilter = async (language: string): Promise<FilterWithoutType> => {
  const rawStructures = await fetchStructures({ language });
  return adaptStructureFilter(rawStructures.results);
};
