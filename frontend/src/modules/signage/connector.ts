import { getSignageType } from 'modules/signageType/connector';
import { adaptSignages } from './adapter';
import { fetchSignage } from './api';
import { SignageDictionary } from './interface';

type Type =
  | 'TREK'
  | 'TOURISTIC_CONTENT'
  | 'OUTDOOR_SITE'
  | 'OUTDOOR_COURSE'
  | 'TOURISTIC_EVENT'
  | undefined;

const getNearProp = (type: Type): string | null => {
  if (type === undefined) {
    return null;
  }
  return `near_${type.replace('_', '').toLowerCase()}`;
};
export const getSignage = async (
  language: string,
  id: string,
  type?: Type,
): Promise<SignageDictionary | null> => {
  const nearProp = getNearProp(type);
  try {
    const [rawSignage, signageTypeDictionary] = await Promise.all([
      fetchSignage({ language, ...(nearProp !== null && { [nearProp]: Number(id) }) }),
      getSignageType(language),
    ]);
    return adaptSignages({
      rawSignages: rawSignage.results,
      signageTypeDictionary,
    });
  } catch (e) {
    return null;
  }
};
