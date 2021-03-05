import { generatePageNumbersArray } from 'modules/utils/connector';
import { getGlobalConfig } from 'modules/utils/api.config';
import { adaptCities, adaptCitiesSinglePage } from './adapter';
import { fetchCities } from './api';
import { CityDictionnary } from './interface';

export const getCities = async (language: string): Promise<CityDictionnary> => {
  const resultsNumber = getGlobalConfig().searchResultsPageSize;
  // First call to get the count of result - actual result size is limited by page_size
  const cities = await fetchCities({
    language,
    page_size: resultsNumber,
  });
  if (cities.count < resultsNumber) {
    return adaptCitiesSinglePage(cities.results);
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
  return adaptCities(citiesAllPages);
};
