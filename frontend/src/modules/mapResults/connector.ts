import { adaptMapResults } from './adapter';
import { fetchMapResults } from './api';
import { MapResults } from './interface';

// TODO it should come from the config
const resultsNumber = 5;

export const getMapResults = async (): Promise<MapResults> => {
  const rawMapResults = await fetchMapResults({ language: 'fr', page_size: resultsNumber });

  return adaptMapResults(rawMapResults);
};
