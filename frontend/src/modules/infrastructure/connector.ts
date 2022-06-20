import { getInfrastructureType } from 'modules/infrastructureType/connector';
import { adaptInfrastructures } from './adapter';
import { fetchInfrastructure } from './api';
import { InfrastructureDictionary } from './interface';

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
export const getInfrastructure = async (
  language: string,
  id: string,
  type?: Type,
): Promise<InfrastructureDictionary | null> => {
  const nearProp = getNearProp(type);
  try {
    const [rawInfrastructure, infrastructureTypeDictionary] = await Promise.all([
      fetchInfrastructure({ language, ...(nearProp !== null && { [nearProp]: Number(id) }) }),
      getInfrastructureType(language),
    ]);
    return adaptInfrastructures({
      rawInfrastructures: rawInfrastructure.results,
      infrastructureTypeDictionary,
    });
  } catch (e) {
    return null;
  }
};
