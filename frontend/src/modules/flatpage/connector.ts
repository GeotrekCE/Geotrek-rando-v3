import { MenuItem } from 'modules/menuItems/interface';
import { CommonDictionaries } from 'modules/dictionaries/interface';
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
  commonDictionaries?: CommonDictionaries,
): Promise<FlatPageDetails> => {
  const { sources = {} } = commonDictionaries ?? {};
  try {
    const rawFlatPageDetails = await fetchFlatPageDetails({ language }, id);
    return adaptFlatPageDetails({
      rawFlatPageDetails,
      sourceDictionnary: sources,
    });
  } catch (e) {
    console.error('Error in flatpage connector', e);
    throw e;
  }
};
