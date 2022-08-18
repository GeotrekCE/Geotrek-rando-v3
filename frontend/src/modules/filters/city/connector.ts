import { getGlobalConfig } from 'modules/utils/api.config';
import { generatePageNumbersArray } from 'modules/utils/connector';
import { FilterWithoutType } from '../interface';
import { adaptCityFilter } from './adapter';
import { fetchCities } from './api';
import { RawCity } from './interface';

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
  const citiesAllPages = await Promise.all(
    generatePageNumbersArray(resultsNumber, cities.count).map(pageNumber =>
      fetchCities({
        language,
        page_size: resultsNumber,
        page: pageNumber,
      }),
    ),
  );
  const initialCities: RawCity[] = [];
  const aggregatedCities = citiesAllPages.reduce(
    (currentlyAggregatedCities, currentCities) => [
      ...currentlyAggregatedCities,
      ...currentCities.results,
    ],
    initialCities,
  );
  return adaptCityFilter(aggregatedCities);
};
