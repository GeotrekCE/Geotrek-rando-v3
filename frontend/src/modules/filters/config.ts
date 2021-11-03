import getNextConfig from 'next/config';
import { uniqBy } from 'lodash';
import { FilterConfig, FilterConfigWithOptions } from './interface';

export const getFiltersConfig = (): (FilterConfig | FilterConfigWithOptions)[] => {
  const {
    publicRuntimeConfig: { filter },
  } = getNextConfig();

  const filterLocal = Object.values(filter);

  const dedoublonFilterLocal = uniqBy(filterLocal, 'id');

  return dedoublonFilterLocal
    .filter((f: any) => f.display !== false)
    .map((f: any) => ({
      ...f,
      type: f.type === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
    }));
};
