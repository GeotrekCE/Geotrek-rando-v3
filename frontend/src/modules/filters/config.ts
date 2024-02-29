import { uniqBy } from 'modules/utils/array';
import getNextConfig from 'next/config';
import { FilterConfig, FilterConfigWithOptions } from './interface';

export const getFiltersConfig = (): (FilterConfig | FilterConfigWithOptions)[] => {
  const {
    publicRuntimeConfig: { filter },
  } = getNextConfig();

  const filtersLocal = uniqBy(filter as FilterConfig[], 'id');

  return filtersLocal
    .filter(f => f.display !== false)
    .map(f => ({
      ...f,
      type: f.type === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
    }));
};
