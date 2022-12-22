'use strict';

const cacheName = 'trek-pages';

// fetch the resource from the network
const fromNetwork = (request, timeout) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then(response => {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });

// fetch the resource from the browser cache
const fromCache = async request => {
  const cache = await caches.open(cacheName);
  const matching = await cache.match(request);

  return matching || cache.match('/offline');
};

self.addEventListener('fetch', event => {
  if (
    // DEM url are excluded from trek url because it could be too long to load
    (event.request.url.includes('/trek/') && !event.request.url.includes('/dem/')) ||
    event.request.url.includes('/service/') ||
    event.request.url.includes('/outdoor-site/') ||
    event.request.url.includes('/outdoor-course/')
  ) {
    event.respondWith(fromNetwork(event.request, 10000).catch(() => fromCache(event.request)));
  }
});

// Prefetch offline page to be ready on mobile
self.addEventListener('activate', async () => {
  const cache = await caches.open('offline');
  return cache.add('/offline');
});

// Cache search-page/information-pages on dynamic navigation
self.addEventListener('message', async event => {
  if (event.data?.action === 'information-pages' || event.data?.action === 'search-pages') {
    caches.open(event.data.action).then(cache =>
      cache.match(event.source.url).then(res => {
        if (res === undefined) {
          return cache.add(event.source.url)
        }
      })
    )
  }
})
