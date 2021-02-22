import wretch, { ConfiguredMiddleware, WretcherResponse } from 'wretch';
import { getApiUrl } from '../envLoader';

const STALE_CACHE_TIME = 1000 * 60 * 60 * 24;

const cachedRoute: RegExp[] = [
  RegExp(/\/trek_practice/),
  RegExp(/\/city/),
  RegExp(/\/trek_accessibility/),
  RegExp(/\/trek_difficulty/),
  RegExp(/\/district/),
  RegExp(/\/flatpage/),
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

const cacheMiddleware = (throttle = 0): ConfiguredMiddleware => {
  const cache = new Map();
  const inflight = new Map<
    string,
    [(value: WretcherResponse | PromiseLike<WretcherResponse>) => void, (reason?: any) => void][]
  >();
  const throttling = new Set();

  return next => (url, opts) => {
    if (!cachedRoute.some(regex => regex.test(url))) {
      return next(url, opts);
    }
    const method = opts.method === undefined ? '' : opts.method;
    const key = `${method}@${url}`;

    if (cache.has(key) && cache.get(key).expirationDate > Date.now()) {
      return Promise.resolve(cache.get(key).value.clone());
    }

    const inflightRequestList = inflight.get(key);

    if (opts.noCache === false && throttling.has(key)) {
      // If the cache contains a previous response and we are throttling, serve it and bypass the chain.
      if (cache.has(key) && cache.get(key).expirationDate > Date.now()) {
        return Promise.resolve(cache.get(key).value.clone());
      }
      // If the request in already in-flight, wait until it is resolved
      else if (inflightRequestList !== undefined) {
        return new Promise((resolve, reject) => {
          inflightRequestList.push([resolve, reject]);
        });
      }
    }

    // Init. the pending promises Map
    if (!inflight.has(key)) inflight.set(key, []);

    // If we are not throttling, activate the throttle for X milliseconds
    if (throttle && !throttling.has(key)) {
      throttling.add(key);
      setTimeout(() => {
        throttling.delete(key);
      }, throttle);
    }

    // We call the next middleware in the chain.
    return next(url, opts)
      .then(_ => {
        // Add a cloned response to the cache
        cache.set(key, { value: _.clone(), expirationDate: Date.now() + STALE_CACHE_TIME });
        // Resolve pending promises
        const currentInflightRequestList = inflight.get(key);
        if (currentInflightRequestList !== undefined) {
          currentInflightRequestList.forEach(([resolve, reject]) => resolve(_.clone()));
        }
        // Remove the inflight pending promises
        inflight.delete(key);
        // Return the original response
        return _;
      })
      .catch(_ => {
        // Reject pending promises on error
        const currentInflightRequestList = inflight.get(key);
        if (currentInflightRequestList !== undefined) {
          currentInflightRequestList.forEach(([resolve, reject]) => reject(_));
        }
        inflight.delete(key);
        throw _;
      });
  };
};

export const GeotrekAPI = wretch(getApiUrl()).middlewares([cacheMiddleware(1000)]);
