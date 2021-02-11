import { MenuItem } from 'modules/header/interface';
import { adaptFlatPages } from './adapter';
import { fetchFlatPages } from './api';

export const getFlatPages = async (): Promise<MenuItem[]> => {
  const rawFlatPages = await fetchFlatPages({ language: 'fr' });
  return adaptFlatPages(rawFlatPages.results);
};
