if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js');
      let t = Promise.resolve();
      return (
        s[e] ||
          (t = new Promise(async t => {
            if ('document' in self) {
              const s = document.createElement('script');
              (s.src = e), document.head.appendChild(s), (s.onload = t);
            } else importScripts(e), t();
          })),
        t.then(() => {
          if (!s[e]) throw new Error(`Module ${e} didn’t register its module`);
          return s[e];
        })
      );
    },
    t = (t, s) => {
      Promise.all(t.map(e)).then(e => s(1 === e.length ? e[0] : e));
    },
    s = { require: Promise.resolve(t) };
  self.define = (t, i, a) => {
    s[t] ||
      (s[t] = Promise.resolve().then(() => {
        let s = {};
        const c = { uri: location.origin + t.slice(1) };
        return Promise.all(
          i.map(t => {
            switch (t) {
              case 'exports':
                return s;
              case 'module':
                return c;
              default:
                return e(t);
            }
          }),
        ).then(e => {
          const t = a(...e);
          return s.default || (s.default = t), s;
        });
      }));
  };
}
define('./sw.js', ['./workbox-8778d57b'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/1ietmPpq1T9zQPdH_t3It/_buildManifest.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/1ietmPpq1T9zQPdH_t3It/_ssgManifest.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/0af1292435bc0fd636b2a4f779544ba0771601a8.5ad468cb207fbf45bbbb.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/0af1292435bc0fd636b2a4f779544ba0771601a8.5ad468cb207fbf45bbbb.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/1f4360c7.955cd01b185e91c5e5fc.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/1f4360c7.955cd01b185e91c5e5fc.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/23f3a5cf321d11cec263cba9fadb5c4fedad53f6.9844d517fbaf7ca67d67.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/23f3a5cf321d11cec263cba9fadb5c4fedad53f6.9844d517fbaf7ca67d67.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/24.3148f3ad12ca297f1932.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/24.3148f3ad12ca297f1932.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/25.8dd0bb5ee2b67a65350a.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/25.8dd0bb5ee2b67a65350a.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/26.2120b2ee5bf09c98e987.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/26.2120b2ee5bf09c98e987.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/56a432aa34875e086556dc44f4a8191af5160591.fa5380eb53a8a778a066.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/56a432aa34875e086556dc44f4a8191af5160591.fa5380eb53a8a778a066.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/884eed38506648200ef4ca33a3adbf82ff9ba3a8.0d68be1f3f1f3c17f4c3.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/884eed38506648200ef4ca33a3adbf82ff9ba3a8.0d68be1f3f1f3c17f4c3.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/99b23f58e0eb50d790a3920a776c8a4fb9fc62cb.fcff7a4446e37a4fe7f3.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/99b23f58e0eb50d790a3920a776c8a4fb9fc62cb.fcff7a4446e37a4fe7f3.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/a0f18e3be0dba2cc10687e667485a703d22f6ec9.97dca4096f37474d4620.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/a0f18e3be0dba2cc10687e667485a703d22f6ec9.97dca4096f37474d4620.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/afc103f2b86f5ac08b28331da5573cf2b663d978.32247a88f3eff3481061.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/afc103f2b86f5ac08b28331da5573cf2b663d978.32247a88f3eff3481061.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/c158f0e1.65755f538e069086f3b7.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/c158f0e1.65755f538e069086f3b7.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/c65a454a.5e787eda687e9aa37af3.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/c65a454a.5e787eda687e9aa37af3.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687.838f6d85a41a48428297.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687.838f6d85a41a48428297.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687_CSS.7b37a38a8911fc5fb44b.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687_CSS.7b37a38a8911fc5fb44b.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/commons.573466d6cce220d42938.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/commons.573466d6cce220d42938.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/framework.f890b1b4aaae3f2a1f97.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/framework.f890b1b4aaae3f2a1f97.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/main-195c93a874ab5d1c2865.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/main-195c93a874ab5d1c2865.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/%5BdetailsId%5D-9e1d6026110e79c4459f.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/%5BdetailsId%5D-9e1d6026110e79c4459f.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/_app-77666d4e7a700fad244a.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/_app-77666d4e7a700fad244a.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/_error-4c2d74c0306d571843f0.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/_error-4c2d74c0306d571843f0.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/index-fa3c1e9b3962c476cea3.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/index-fa3c1e9b3962c476cea3.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/information/%5BflatPage%5D-f2afcd7ff94fecb0c015.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/information/%5BflatPage%5D-f2afcd7ff94fecb0c015.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/search-5742512791d71fd26475.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/search-5742512791d71fd26475.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/pages/service/%5BtouristicContent%5D-f97ad34935e41806d0e3.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url:
            '/_next/static/chunks/pages/service/%5BtouristicContent%5D-f97ad34935e41806d0e3.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/polyfills-72cdd915009371a6f272.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/polyfills-72cdd915009371a6f272.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/webpack-65f60615c485525bce64.js',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/chunks/webpack-65f60615c485525bce64.js.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        { url: '/_next/static/css/051c0bcea3dcace31bb6.css', revision: '1ietmPpq1T9zQPdH_t3It' },
        {
          url: '/_next/static/css/051c0bcea3dcace31bb6.css.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        { url: '/_next/static/css/83aae4d8ec92b08d3834.css', revision: '1ietmPpq1T9zQPdH_t3It' },
        {
          url: '/_next/static/css/83aae4d8ec92b08d3834.css.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        { url: '/_next/static/css/dac94fa20f694efa14ec.css', revision: '1ietmPpq1T9zQPdH_t3It' },
        {
          url: '/_next/static/css/dac94fa20f694efa14ec.css.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        { url: '/_next/static/css/e1889aeaf91c54b8d31e.css', revision: '1ietmPpq1T9zQPdH_t3It' },
        {
          url: '/_next/static/css/e1889aeaf91c54b8d31e.css.map',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/elevation-lime.106f396a2ba1c4544a603d538087cc86.svg',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/elevation-position.527bccf4a4e4b6e3440e8517103f1bdf.png',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/elevation-purple.685c0ab78f509da8688f61c975e469c5.svg',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/elevation-pushpin.49dc2528d0466def607a078cbaac667a.png',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/elevation-steelblue.f3bbff24162a4ac33867a97cb6079282.svg',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/elevation.106f396a2ba1c4544a603d538087cc86.svg',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/layers-2x.8f2c4d11474275fbc1614b9098334eae.png',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/layers.416d91365b44e4b4f4777663e6f009f3.png',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/marker-icon.2b3e1faf89f94a4835397e7a43b4f77d.png',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/remove.24059db8a65fda711594c4a315cb9943.svg',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/slick.2630a3e3eab21c607e21576571b95b9d.svg',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/slick.295183786cd8a138986521d9f388a286.woff',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/slick.a4e97f5a2a64f0ab132323fbeb33ae29.eot',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
        {
          url: '/_next/static/media/slick.c94f7671dcc99dce43e22a89f486f7c2.ttf',
          revision: '1ietmPpq1T9zQPdH_t3It',
        },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/details-.*$/i,
      new e.NetworkFirst({
        cacheName: 'details-pages',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 604800, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/search.*$/i,
      new e.NetworkFirst({
        cacheName: 'search-pages',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 604800, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET',
    );
});
//# sourceMappingURL=sw.js.map
