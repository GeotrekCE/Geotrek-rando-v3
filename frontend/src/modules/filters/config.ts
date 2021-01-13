import { FilterConfig, FilterConfigWithOptions } from './interface';

import filterConfig from '../../../config/filterConfig.json';

export const getFiltersConfig = (): (FilterConfig | FilterConfigWithOptions)[] => filterConfig;
