import {
  CacheFirst,
  ExpirationPlugin,
  NetworkFirst,
  NetworkOnly,
  RangeRequestsPlugin,
  RuntimeCaching,
  StaleWhileRevalidate,
} from 'serwist';

const PAGES_CACHE_NAME = {
  rscPrefetch: 'pages-rsc-prefetch',
  rsc: 'pages-rsc',
  html: 'pages',
} as const;

const ONE_DAY = 24 * 60 * 60;
const NINETY_DAYS = 90 * ONE_DAY;
const WEEK = 7 * ONE_DAY;
const YEAR = 365 * ONE_DAY;

const runtimeCaching: RuntimeCaching[] =
  process.env.NODE_ENV !== 'production'
    ? [
        {
          matcher: /.*/i,
          handler: new NetworkOnly(),
        },
      ]
    : [
        {
          matcher: ({ request, sameOrigin, url }) =>
            !sameOrigin &&
            !url.host.includes('opentopomap') &&
            !url.host.includes('openstreetmap') &&
            !url.host.includes('stamen-tiles') &&
            !url.host.includes('wxs.ign.fr') &&
            !url.host.includes('data.geopf.fr') &&
            !url.pathname.startsWith('/api/hdviewpoint/drf/hdviewpoints/') &&
            request.destination === 'image',
          handler: new NetworkFirst({
            cacheName: 'cross-origin-media',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 128,
                maxAgeSeconds: NINETY_DAYS,
              }),
            ],
            networkTimeoutSeconds: 10,
          }),
        },
        {
          matcher: ({ sameOrigin, url }) => !sameOrigin && url.pathname.startsWith('/api/'),
          handler: new NetworkFirst({
            cacheName: 'API',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 512,
                maxAgeSeconds: NINETY_DAYS,
              }),
            ],
            networkTimeoutSeconds: 10,
          }),
        },
        {
          matcher: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
          handler: new CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: YEAR,
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
          handler: new StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: YEAR,
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
          handler: new StaleWhileRevalidate({
            cacheName: 'static-font-assets',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: WEEK,
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
          handler: new StaleWhileRevalidate({
            cacheName: 'static-image-assets',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 64,
                maxAgeSeconds: NINETY_DAYS,
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: /\/_next\/static.+\.js$/i,
          handler: new CacheFirst({
            cacheName: 'next-static-js-assets',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 64,
                maxAgeSeconds: NINETY_DAYS,
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: /\/_next\/image\?url=.+$/i,
          handler: new StaleWhileRevalidate({
            cacheName: 'next-image',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 64,
                maxAgeSeconds: NINETY_DAYS,
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: /\.(?:mp3|wav|ogg)$/i,
          handler: new CacheFirst({
            cacheName: 'static-audio-assets',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: ONE_DAY,
                maxAgeFrom: 'last-used',
              }),
              new RangeRequestsPlugin(),
            ],
          }),
        },
        {
          matcher: /\.(?:mp4|webm)$/i,
          handler: new CacheFirst({
            cacheName: 'static-video-assets',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: ONE_DAY,
                maxAgeFrom: 'last-used',
              }),
              new RangeRequestsPlugin(),
            ],
          }),
        },
        {
          matcher: /\.(?:js)$/i,
          handler: new StaleWhileRevalidate({
            cacheName: 'static-js-assets',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 48,
                maxAgeSeconds: NINETY_DAYS, // 24 hours
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: /\.(?:css|less)$/i,
          handler: new StaleWhileRevalidate({
            cacheName: 'static-style-assets',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: NINETY_DAYS,
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: ({ url: { pathname } }) =>
            pathname.startsWith('/_next/data/') &&
            pathname.endsWith('.json') &&
            !pathname.endsWith('search.json'),
          handler: new NetworkFirst({
            cacheName: 'next-data',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: NINETY_DAYS,
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: /^(?!.*\/search\.json$).*?\.(?:json|xml|csv)$/i,
          handler: new NetworkFirst({
            cacheName: 'static-data-assets',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: NINETY_DAYS, // 24 hours
                maxAgeFrom: 'last-used',
              }),
            ],
          }),
        },
        {
          matcher: ({ sameOrigin, url: { pathname } }) => {
            // Exclude /api/auth/callback/* to fix OAuth workflow in Safari without having
            // an impact on other environments
            // The above route is the default for next-auth, you may need to change it if
            // your OAuth workflow has a different callback route.
            // Issue: https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809
            // TODO(ducanhgh): Investigate Auth.js's "/api/auth/*" failing when we allow them
            // to be cached (the current behaviour).
            if (!sameOrigin || pathname.startsWith('/api/auth/callback')) {
              return false;
            }

            if (pathname.startsWith('/api/')) {
              return true;
            }

            return false;
          },
          method: 'GET',
          handler: new NetworkFirst({
            cacheName: 'apis',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 16,
                maxAgeSeconds: ONE_DAY,
                maxAgeFrom: 'last-used',
              }),
            ],
            networkTimeoutSeconds: 10, // fallback to cache if API does not response within 10 seconds
          }),
        },
        {
          matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get('RSC') === '1' &&
            request.headers.get('Next-Router-Prefetch') === '1' &&
            sameOrigin &&
            !pathname.startsWith('/api/'),
          handler: new NetworkFirst({
            cacheName: PAGES_CACHE_NAME.rscPrefetch,
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: ONE_DAY,
              }),
            ],
          }),
        },
        {
          matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get('RSC') === '1' && sameOrigin && !pathname.startsWith('/api/'),
          handler: new NetworkFirst({
            cacheName: PAGES_CACHE_NAME.rsc,
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: ONE_DAY,
              }),
            ],
          }),
        },
        {
          matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get('Content-Type')?.includes('text/html') &&
            sameOrigin &&
            !pathname.startsWith('/api/') &&
            !pathname.startsWith('/search'),
          handler: new NetworkFirst({
            cacheName: PAGES_CACHE_NAME.html,
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: ONE_DAY,
              }),
            ],
          }),
        },
        {
          matcher: ({ sameOrigin, url: { pathname } }) =>
            sameOrigin &&
            (pathname.startsWith('/trek/') ||
              pathname.startsWith('/service/') ||
              pathname.startsWith('/outdoor-') ||
              pathname.startsWith('/event/')) ||
              pathname.startsWith('/information/'),
          handler: new NetworkFirst({
            cacheName: 'pages',
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: NINETY_DAYS,
              }),
            ],
            networkTimeoutSeconds: 10,
          }),
        },
        {
          matcher: ({ sameOrigin }) => sameOrigin,
          handler: new NetworkOnly({
            plugins: [
              new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: NINETY_DAYS,
              }),
            ],
          }),
        },
      ];

export default runtimeCaching;
