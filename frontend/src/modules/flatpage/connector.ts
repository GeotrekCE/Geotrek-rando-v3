import { MenuItem } from 'modules/menuItems/interface';
import { getSources } from 'modules/source/connector';
import { adaptFlatPageDetails, adaptFlatPages } from './adapter';
import { fetchFlatPageDetails, fetchFlatPages } from './api';
import { FlatPageDetails } from './interface';

export const getFlatPages = async (language: string): Promise<MenuItem[]> => {
  const rawFlatPages = await fetchFlatPages({ language });
  return adaptFlatPages(rawFlatPages.results);
};

export const getFlatPageDetails = async (
  id: string,
  language: string,
): Promise<FlatPageDetails> => {
  try {
    const [rawFlatPageDetails, sourceDictionnary] = await Promise.all([
      fetchFlatPageDetails({ language }, id),
      getSources(language),
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
