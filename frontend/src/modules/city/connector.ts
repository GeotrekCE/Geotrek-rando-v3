import { generatePageNumbersArray } from 'modules/utils/connector';
import { getGlobalConfig } from 'modules/utils/api.config';
import { concatResults } from 'modules/utils/adapter';
import { adaptCities } from './adapter';
import { fetchCities } from './api';
import { CityDictionnary } from './interface';

export const getCities = async (language: string): Promise<CityDictionnary> => {
  const resultsNumber = getGlobalConfig().mapResultsPageSize;
  // First call to get the count of result - actual result size is limited by page_size
  const cities = await fetchCities({
    language,
    page_size: resultsNumber,
  });
  if (cities.count < resultsNumber) {
    return adaptCities(cities.results);
  }
  // Second call with loop to load all the necessary pages to reach the count
  const citiesOtherPages = await Promise.all(
    generatePageNumbersArray(resultsNumber, cities.count)
      .slice(1)
      .map(pageNumber =>
        fetchCities({
          language,
          page_size: resultsNumber,
          page: pageNumber,
        }),
      ),
  );

  return adaptCities(concatResults([cities, ...citiesOtherPages]));
};
