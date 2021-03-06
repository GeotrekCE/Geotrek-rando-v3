import { FilterConfig, FilterConfigWithOptions } from './interface';

import filterConfig from '../../../customization/config/filter.json';

export const getFiltersConfig = (): (FilterConfig | FilterConfigWithOptions)[] =>
  filterConfig.map(filter => ({
    ...filter,
    type: filter.type === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
  }));
