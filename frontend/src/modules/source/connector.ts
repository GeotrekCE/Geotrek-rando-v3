import { adaptSources } from './adapter';
import { fetchSources } from './api';
import { SourceDictionnary } from './interface';

export const getSources = async (): Promise<SourceDictionnary> => {
  const rawSources = await fetchSources({ language: 'fr' });
  return adaptSources(rawSources.results);
};
