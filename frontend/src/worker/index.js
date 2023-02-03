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

  // Avoid to save search.json to redirect to offline page
  if (event.request.url.includes('/search.json')) {
    event.respondWith(fromNetwork(event.request, 10000).catch(() => {}));
  }
});

// Prefetch offline page to be ready on mobile
self.addEventListener('activate', async () => {
  const cache = await caches.open('offline');
  return cache.add('/offline');
});

self.addEventListener('message', async event => {
  // Cache search-page as offline page on dynamic navigation
  if (event.data?.action === 'search-pages') {
    const offlineCache = await caches.open('offline').then(cache => cache.match('/offline'));
    caches.open(event.data.action).then(cache =>
      cache.match(event.source.url).then(async (res) => {
        if (res === undefined) {
          fetch(event.source.url).then(() => (
            cache.put(event.source.url, offlineCache)
          ));
        }
      })
      )
    }

  // Cache information-pages on dynamic navigation
  if (event.data?.action === 'information-pages') {
    caches.open(event.data.action).then(cache =>
      cache.match(event.source.url).then(res => {
        if (res === undefined) {
          return cache.add(event.source.url)
        }
      })
    )
  }
})
