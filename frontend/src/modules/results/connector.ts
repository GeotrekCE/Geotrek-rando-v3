import { getDifficulties } from 'modules/filters/connector';
import { adaptTrekResults } from './adapter';
import { fetchTrekResults } from './api';
import { TrekResults } from './interface';

export const getTrekResults = async (): Promise<TrekResults> => {
  const [rawTrekResults, difficulties] = await Promise.all([
    fetchTrekResults({ language: 'fr' }),
    getDifficulties(),
  ]);

  return adaptTrekResults({ rawTrekResults, difficulties });
};
