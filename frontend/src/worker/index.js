'use strict';

self.addEventListener('message', event => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(event.data);
  //

  if (event.command === 'getTreksCached') {
  }
});

const cacheName = 'trek-pages';

// fetch the resource from the network
const fromNetwork = (request, timeout) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    console.log('Try request for', request.url);
    fetch(request).then(response => {
      clearTimeout(timeoutId);
      fulfill(response);
      //update(request);
    }, reject);
  });

// cache the current page to make it available for offline
const update = request => {
  return caches
    .open(cacheName)
    .then(cache => fetch(request).then(response => cache.put(request, response)));
};

// fetch the resource from the browser cache
const fromCache = async request => {
  const cache = await caches.open(cacheName);
  const matching = await cache.match(request);

  console.log('MATCHING:', matching, request.url);

  return matching || cache.match('/offline/');
};

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/trek')) {
    console.log('SW url', event.request.url);
    event.respondWith(fromNetwork(event.request, 10000).catch(() => fromCache(event.request)));
  }
});
