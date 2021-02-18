import { adaptSources } from './adapter';
import { fetchSources } from './api';
import { SourceDictionnary } from './interface';

export const getSources = async (language: string): Promise<SourceDictionnary> => {
  const rawSources = await fetchSources({ language });
  return adaptSources(rawSources.results);
};
