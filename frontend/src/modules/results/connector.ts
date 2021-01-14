import { getDifficulties } from 'modules/filters/connector';
import { getThemes } from 'modules/filters/theme/connector';
import { adaptTrekResults } from './adapter';
import { fetchTrekResults } from './api';
import { TrekResults } from './interface';

// TODO it should come from the config
const resultsNumber = 5;

export const getTrekResults = async (): Promise<TrekResults> => {
  const [rawTrekResults, difficulties, themes] = await Promise.all([
    fetchTrekResults({ language: 'fr', page_size: resultsNumber }),
    getDifficulties(),
    getThemes(),
  ]);

  return adaptTrekResults({ rawTrekResults, difficulties, themes });
};
