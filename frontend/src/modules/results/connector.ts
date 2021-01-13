import { getDifficulties } from 'modules/filters/connector';
import { getTags } from 'modules/tags/connector';
import { adaptTrekResults } from './adapter';
import { fetchTrekResults } from './api';
import { TrekResults } from './interface';

export const getTrekResults = async (): Promise<TrekResults> => {
  const [rawTrekResults, difficulties, tags] = await Promise.all([
    fetchTrekResults({ language: 'fr' }),
    getDifficulties(),
    getTags(),
  ]);

  return adaptTrekResults({ rawTrekResults, difficulties, tags });
};
