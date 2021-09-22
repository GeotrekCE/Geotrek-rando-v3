import getNextConfig from 'next/config';
import { FilterConfig, FilterConfigWithOptions } from './interface';

export const getFiltersConfig = (): (FilterConfig | FilterConfigWithOptions)[] => {
  const {
    publicRuntimeConfig: { filter },
  } = getNextConfig();

  return filter.map(f => ({
    ...f,
    type: f.type === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
  }));
};
