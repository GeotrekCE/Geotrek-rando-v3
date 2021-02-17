import { MenuItem } from 'modules/header/interface';
import { getSources } from 'modules/source/connector';
import { adaptFlatPageDetails, adaptFlatPages } from './adapter';
import { fetchFlatPageDetails, fetchFlatPages } from './api';
import { FlatPageDetails } from './interface';

export const getFlatPages = async (language?: string): Promise<MenuItem[]> => {
  const rawFlatPages = await fetchFlatPages({ language: language ?? 'fr' });
  return adaptFlatPages(rawFlatPages.results);
};

export const getFlatPageDetails = async (id: string): Promise<FlatPageDetails> => {
  try {
    const [rawFlatPageDetails, sourceDictionnary] = await Promise.all([
      fetchFlatPageDetails({ language: 'fr' }, id),
      getSources(),
    ]);
    return adaptFlatPageDetails({
      rawFlatPageDetails,
      sourceDictionnary,
    });
  } catch (e) {
    console.error('Error in flatpage connector', e);
    throw e;
  }
};
