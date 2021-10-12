'use strict';

self.addEventListener('message', event => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(event.data);
  //
  caches.keys().then(keys => {
    keys.map(key => {
      console.log(key);
      caches.open(key).then(cache => {
        console.log(cache.matchAll('*').then(console.log));
      });
    });
  });
});
