import { getGlobalConfig } from 'modules/utils/api.config';
import { generatePageNumbersArray } from 'modules/utils/connector';
import { concatResults } from 'modules/utils/adapter';
import { adaptSources } from './adapter';
import { fetchSources } from './api';
import { SourceDictionnary } from './interface';

export const getSources = async (language: string): Promise<SourceDictionnary> => {
  const resultsNumber = getGlobalConfig().mapResultsPageSize;
  const rawSources = await fetchSources({ language, page_size: resultsNumber });
  if (rawSources.count < resultsNumber) {
    return adaptSources(rawSources.results);
  }
  // Second call with loop to load all the necessary pages to reach the count
  const rawSourcesOtherPages = await Promise.all(
    generatePageNumbersArray(resultsNumber, rawSources.count)
      .slice(1)
      .map(pageNumber =>
        fetchSources({
          language,
          page_size: resultsNumber,
          page: pageNumber,
        }),
      ),
  );

  return adaptSources(concatResults([rawSources, ...rawSourcesOtherPages]));
};
