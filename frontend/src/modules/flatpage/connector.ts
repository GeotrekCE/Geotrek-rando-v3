import { MenuItem } from 'modules/menuItems/interface';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { getAPIVersion } from 'modules/APIVersion/connector';
import { isLowerOrEqualCurrentAPIVersion } from 'modules/APIVersion/utils';
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
  const { sources = {} } = commonDictionaries || {};
  let rawFlatPageDetails;
  let rawFlatPageChildrenDetails: RawFlatPageDetails[] = [];
  try {
    rawFlatPageDetails = await fetchFlatPageDetails({ language }, id);
  } catch (e) {
    console.error('Error in flatpage connector', e);
    throw e;
  }
  try {
    const currentAPIVersion = await getAPIVersion();
    const is2_104LowerOrEqualCurrentAPIVersion = isLowerOrEqualCurrentAPIVersion(
      '2.104.0',
      currentAPIVersion,
    );
    rawFlatPageChildrenDetails = is2_104LowerOrEqualCurrentAPIVersion
      ? (await fetchChildrenFlatPageDetails({ language }, id)).results
      : [];
  } catch (e) {
    /* empty */
  }
  return adaptFlatPageDetails({
    rawFlatPageDetails,
    sourceDictionnary: sources,
    rawFlatPageChildrenDetails,
  });
};
