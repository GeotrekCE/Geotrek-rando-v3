import { getGlobalConfig } from 'modules/utils/api.config';
import { generatePageNumbersArray } from 'modules/utils/connector';
import { concatResults } from 'modules/utils/adapter';
import { FilterWithoutType } from '../interface';
import { adaptCityFilter } from './adapter';
import { fetchCities } from './api';

export const getCityFilter = async (language: string): Promise<FilterWithoutType> => {
  const resultsNumber = getGlobalConfig().mapResultsPageSize;
  // First call to get the count of result - actual result size is limited by page_size
  const cities = await fetchCities({
    language,
    page_size: resultsNumber,
  });
  if (cities.count < resultsNumber) {
    return adaptCityFilter(cities.results);
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
  const aggregatedCities = [...cities.results, ...concatResults(citiesOtherPages)];
  return adaptCityFilter(aggregatedCities);
};
