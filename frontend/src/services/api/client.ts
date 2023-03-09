import { getGlobalConfig } from 'modules/utils/api.config';
import axios from 'axios';
import { captureException } from '@sentry/nextjs';
import withCache from './cache';

const instance = axios.create({
  baseURL: getGlobalConfig().apiUrl,
});

// Handling Errors
instance.interceptors.response.use(
  response => response,
  error => {
    const { page } = error.config?.params || {};
    if (page !== undefined) {
      return Promise.resolve({
        data: {
          results: [],
          next: null,
          previous: page === 1 ? null : `page=${Number(page) - 1}`,
        },
      });
    }
    if (error) {
      captureException(error);
    }
    if (error?.response?.status === 404) {
      throw new Error('RESSOURCE_NOT_FOUND');
    }
  },
);

export const GeotrekAPI = getGlobalConfig().enableServerCache ? withCache(instance) : instance;
