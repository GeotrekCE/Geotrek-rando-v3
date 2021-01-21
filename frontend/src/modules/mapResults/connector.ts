import { adaptMapResults } from './adapter';
import { fetchMapResults } from './api';
import { MapResults } from './interface';
import { generatePageNumbersArray } from './utils';

// TODO it should come from the config
const resultsNumber = 5;

export const getMapResults = async (): Promise<MapResults> => {
  const rawMapResults = await fetchMapResults({ language: 'fr', page_size: resultsNumber });

  const mapResults = await Promise.all(
    generatePageNumbersArray(resultsNumber, rawMapResults.count).map(pageNumber =>
      fetchMapResults({ language: 'fr', page_size: resultsNumber, page: pageNumber }),
    ),
  );

  return adaptMapResults(mapResults);
};
