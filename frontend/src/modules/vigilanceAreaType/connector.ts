import { FilterWithoutType } from 'modules/filters/interface';
import { VIGILANCE_TYPE_EXCLUDE_ID, VIGILANCE_TYPE_ID } from 'modules/filters/constant';
import { getGlobalConfig } from 'modules/utils/api.config';
import { adaptVigilanceAreaTypes } from './adapter';
import { fetchVigilanceAreaTypes } from './api';
import { VigilanceAreaType } from './interface';

export const getVigilanceAreaTypes = async (
  language: string,
): Promise<Record<string, VigilanceAreaType>> => {
  const rawVigilanceAreaTypes = await fetchVigilanceAreaTypes({ language });
  return adaptVigilanceAreaTypes({ rawVigilanceAreaTypes: rawVigilanceAreaTypes.results, language });
};

export const getVigilanceTypeFilter = async (
  language: string,
  withExclude = false,
  customId?: string,
): Promise<FilterWithoutType | null> => {
  if (!getGlobalConfig().enableVigilanceAreas) {
    return null;
  }
  const vigilanceTypes = await getVigilanceAreaTypes(language);
  const options = Object.values(vigilanceTypes).map(type => ({
    value: type.id,
    label: type.name,
    pictogramUrl: type.pictogramUrl || undefined,
  }));

  if (options.length === 0) {
    return null;
  }

  const defaultId = withExclude ? VIGILANCE_TYPE_EXCLUDE_ID : VIGILANCE_TYPE_ID;

  return {
    id: customId ?? defaultId,
    options,
  };
};
