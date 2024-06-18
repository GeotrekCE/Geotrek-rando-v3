import { Axios } from 'axios';
import store from 'store';
import { getGlobalConfig } from 'modules/utils/api.config';

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

const apiUrl = getGlobalConfig().apiUrl;

export const requestInterceptor = (config: any) => {
  const params = new URLSearchParams(config.params as URLSearchParams);
  const key = `${apiUrl}${config.url}?${params.toString()}`;

  if (config.method === 'get' && store.get(key) != null) {
    const cached = store.get(key);

    if (Date.now() < cached.expiration) {
      config.data = cached.data;

      // eslint-disable-next-line
      config._fromCache = true;

      config.adapter = () => {
        return Promise.resolve({
          data: config.data,
          status: config.status,
          statusText: config.statusText,
          headers: config.headers,
          config,
          request: config,
        });
      };
    }
  }

  return config;
};

export const responseInterceptor = (response: any) => {
  if (
    response?.config !== undefined &&
    // eslint-disable-next-line
    !response.config._fromCache &&
    response.config.method === 'get' &&
    cachedRoute.some(r => r.test(response.config.url as string))
  ) {
    const params = new URLSearchParams(response.config.params as URLSearchParams);
    const key = `${apiUrl}${response.config.url}?${params.toString()}`;

    store.set(key, { data: response.data, expiration: Date.now() + STALE_CACHE_TIME });
  }
  return response;
};

const cache = (axios: Axios) => {
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(responseInterceptor);
  return axios;
};

export default cache;
