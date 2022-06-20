import { getServiceType } from 'modules/serviceType/connector';
import { adaptServices } from './adapter';
import { fetchService } from './api';
import { Service } from './interface';

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
export const getService = async (
  language: string,
  id: string,
  type?: Type,
): Promise<Service[] | null> => {
  const nearProp = getNearProp(type);
  try {
    const [rawService, serviceTypeDictionary] = await Promise.all([
      fetchService({ language, ...(nearProp !== null && { [nearProp]: Number(id) }) }),
      getServiceType(language),
    ]);
    return adaptServices({
      rawService: rawService.results,
      serviceTypeDictionary,
    });
  } catch (e) {
    return null;
  }
};
