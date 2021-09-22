import getNextConfig from 'next/config';
import { FilterConfig, FilterConfigWithOptions } from './interface';

export const getFiltersConfig = (): (FilterConfig | FilterConfigWithOptions)[] => {
  const {
    publicRuntimeConfig: { filter },
  } = getNextConfig();

  const _filter = Object.values(filter);

  return _filter.map((f: any) => ({
    ...f,
    type: f.type === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
  }));
};
