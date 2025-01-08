'use strict';

module.exports = [
  // if you are customizing your runtime cache rules, please note that the
  // first item in the runtime cache configuration array MUST be "start-url"
  {
    // MUST be the same as "start_url" in manifest.json
    urlPattern: '/',
    // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
    // use StaleWhileRevalidate if you want to prompt user to reload when new version available
    handler: 'NetworkFirst',
    options: {
      // don't change cache name
      cacheName: 'start-url',
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 90 * 60 * 60 * 24, // 90 days
      },
    },
  },
  {
    urlPattern: '/offline',
    handler: 'NetworkFirst',
    options: {
      cacheName: 'offline',
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 90 * 60 * 60 * 24, // 90 days
      },
    },
  },
  {
    urlPattern: ({ url, request }) => {
      return self.origin !== url.origin
        && !url.host.includes('opentopomap')
        && !url.host.includes('openstreetmap')
        && !url.host.includes('stamen-tiles')
        && !url.host.includes('wxs.ign.fr')
        && !url.host.includes('data.geopf.fr')
        && !url.pathname.startsWith('/api/hdviewpoint/drf/hdviewpoints/')
        && request.destination === 'image'
    },
    handler: 'NetworkFirst',
    options: {
      cacheName: 'cross-origin-media',
      expiration: {
        maxEntries: 128,
        maxAgeSeconds: 90 * 60 * 60 * 24, // 90 days
      },
      networkTimeoutSeconds: 10,
    },
  },
  {
    urlPattern: ({ url }) => {
      return self.origin !== url.origin 
        && url.pathname.startsWith('/api/')
    },
    handler: 'NetworkFirst',
    options: {
      cacheName: 'API',
      expiration: {
        maxEntries: 512,
        maxAgeSeconds: 90 * 60 * 60 * 24, // 90 day
      },
      networkTimeoutSeconds: 10,
    }
  },
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts',
      expiration: {
        maxEntries: 8,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
      },
    },
  },
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-font-assets',
      expiration: {
        maxEntries: 8,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      },
    },
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-image-assets',
      expiration: {
        maxEntries: 128,
        maxAgeSeconds: 90 * 60 * 60 * 24, // 90 days
      },
    },
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-js-assets',
      expiration: {
        maxEntries: 128,
        maxAgeSeconds: 90 * 60 * 60 * 24, // 90 days
      },
    },
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-style-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 90 * 60 * 60 * 24, // 90 days
      },
    },
  },
  {
    urlPattern: /\.(?:json|xml|csv)$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'static-data-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 90 * 60 * 60 * 24, // 90 days
      },
    },
  },
  /*{
    urlPattern: /\/trek\/.*$/i,
    handler: 'NetworkFirst',
    method: 'GET',
    options: {
      cacheName: 'trek-pages',
      expiration: {
        maxEntries: 512,
        maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },*/
  /*{
    urlPattern: /\/service\/.*$/i,
    handler: 'NetworkFirst',
    method: 'GET',
    options: {
      cacheName: 'touritic-content-pages',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },*/
  {
    urlPattern: /\/search.*$/i,
    handler: 'NetworkFirst',
    method: 'GET',
    options: {
      cacheName: 'search-pages',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },
  {
    urlPattern: ({ url }) => {
      return self.origin === url.origin
        && url.pathname.startsWith('/information')
    },
    handler: 'NetworkFirst',
    options: {
      cacheName: 'information-pages',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },
];
