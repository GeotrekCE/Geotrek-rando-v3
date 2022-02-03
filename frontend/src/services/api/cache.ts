import { Axios } from 'axios';
import qs from 'qs';

const STALE_CACHE_TIME = 1000 * 60 * 60 * 24;

const cachedRoute: RegExp[] = [
  RegExp(/\/trek_practice/),
  RegExp(/\/city/),
  RegExp(/\/trek_accessibility/),
  RegExp(/\/trek_difficulty/),
  RegExp(/\/district/),
  RegExp(/\/label/),
  RegExp(/\/portal/),
  RegExp(/\/theme/),
  RegExp(/\/touristiccontent_category/),
  RegExp(/\/structure/),
  RegExp(/\/trek_route/),
  RegExp(/\/trek_network/),
  RegExp(/\/poi_type/),
  RegExp(/\/source/),
  RegExp(/\/informationdesk/),
];

const cache = new Map();

export const requestInterceptor = (config: any) => {
  const key = config.url + '?' + qs.stringify(config.params);

  if (config.method === 'get' && cache.has(key)) {
    const cached = cache.get(key);

    if (Date.now() < cached.expiration) {
      config.data = cached.data;

      config._fromCache = true;

      config.adapter = () => {
        return Promise.resolve({
          data: config.data,
          status: config.status,
          statusText: config.statusText,
          headers: config.headers,
          config: config,
          request: config,
        });
      };
    }
  }

  return config;
};

export const responseInterceptor = (response: any) => {
  if (
    !response?.config._fromCache &&
    response?.config.method === 'get' &&
    cachedRoute.some(r => r.test(response.config.url))
  ) {
    const key = response.config.url + '?' + qs.stringify(response.config.params);

    cache.set(key, { data: response.data, expiration: Date.now() + STALE_CACHE_TIME });
  }
  return response;
};

export default (axios: Axios) => {
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(responseInterceptor);
  return axios;
};
