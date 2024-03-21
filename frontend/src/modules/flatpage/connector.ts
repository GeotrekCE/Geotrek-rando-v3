import { MenuItem } from 'modules/menuItems/interface';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { adaptFlatPageDetails, adaptFlatPages } from './adapter';
import { fetchChildrenFlatPageDetails, fetchFlatPageDetails, fetchFlatPages } from './api';
import { FlatPageDetails, RawFlatPageDetails } from './interface';

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
  let rawFlatPageDetails;
  let rawFlatPageChildrenDetails: RawFlatPageDetails[] = [];
  try {
    rawFlatPageDetails = await fetchFlatPageDetails({ language }, id);
  } catch (e) {
    console.error('Error in flatpage connector', e);
    throw e;
  }
  try {
    rawFlatPageChildrenDetails = (await fetchChildrenFlatPageDetails({ language }, id)).results;
    // Old version of flatPage don't have `children` property
  } catch (e) {
    /* empty */
  }
  return adaptFlatPageDetails({
    rawFlatPageDetails,
    sourceDictionnary: sources,
    rawFlatPageChildrenDetails,
  });
};
