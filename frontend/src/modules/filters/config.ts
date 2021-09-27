import getNextConfig from 'next/config';
import { FilterConfig, FilterConfigWithOptions } from './interface';

export const getFiltersConfig = (): (FilterConfig | FilterConfigWithOptions)[] => {
  const {
    publicRuntimeConfig: { filter },
  } = getNextConfig();

  const filterLocal = Object.values(filter);

  return filterLocal.map((f: any) => ({
    ...f,
    type: f.type === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
  }));
};
