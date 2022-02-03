import { getGlobalConfig } from 'modules/utils/api.config';
import axios from 'axios';
import withCache from './cache';

const instance = axios.create({
  baseURL: getGlobalConfig().apiUrl,
});

// Handling 404
instance.interceptors.response.use(
  r => r,
  e => {
    if (e?.response?.status === 404) {
      throw new Error('RESSOURCE_NOT_FOUND');
    }
  },
);

export const GeotrekAPI = getGlobalConfig().enableServerCache ? withCache(instance) : instance;
