import { adaptStructureFilter } from './adapter';
import { fetchStructures } from './api';

export const getStructureFilter = async () => {
  const rawStructures = await fetchStructures({ language: 'fr' });
  return adaptStructureFilter(rawStructures.results);
};
