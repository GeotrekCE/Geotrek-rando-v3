import { uniqBy } from 'modules/utils/array';
import getNextConfig from 'next/config';
import { getGlobalConfig } from 'modules/utils/api.config';
import { VIGILANCE_DATE_ID, VIGILANCE_TYPE_ID } from './constant';
import { FilterConfig, FilterConfigWithOptions } from './interface';

export const getFiltersConfig = (): (FilterConfig | FilterConfigWithOptions)[] => {
  const {
    publicRuntimeConfig: { filter },
  } = getNextConfig();

  const filtersLocal = uniqBy((filter ?? []) as FilterConfig[], 'id');

  return filtersLocal
    .filter(filterItem => filterItem.display !== false)
    .map(filterItem => ({
      ...filterItem,
      type: filterItem.type === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
    }));
};

const isVigilanceFilterDisplayed = (filterId: string): boolean => {
  if (!getGlobalConfig().enableVigilanceAreas) {
    return false;
  }

  const {
    publicRuntimeConfig: { filter },
  } = getNextConfig();

  const filtersLocal = uniqBy((filter ?? []) as FilterConfig[], 'id');
  const vigilanceFilterConfig = filtersLocal.find(filterItem => filterItem.id === filterId);

  if (vigilanceFilterConfig && vigilanceFilterConfig.display === false) {
    return false;
  }

  return true;
};

export const isVigilanceDateFilterEnabled = (): boolean =>
  isVigilanceFilterDisplayed(VIGILANCE_DATE_ID);

export const isVigilanceTypeFilterEnabled = (): boolean =>
  isVigilanceFilterDisplayed(VIGILANCE_TYPE_ID);

export const isVigilanceFilterEnabled = (): boolean =>
  isVigilanceDateFilterEnabled() || isVigilanceTypeFilterEnabled();
