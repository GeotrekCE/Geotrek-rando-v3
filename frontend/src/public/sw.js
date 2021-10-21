/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./sw.js",['./workbox-3ccebb44'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts("worker-development.js", "fallback-development.js");
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }

        return response;
      }
    }, {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 1,
      maxAgeSeconds: 7776000
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute("/offline", new workbox.NetworkFirst({
    "cacheName": "offline",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 1,
      maxAgeSeconds: 7776000
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 8,
      maxAgeSeconds: 31536000
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i, new workbox.StaleWhileRevalidate({
    "cacheName": "static-font-assets",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 8,
      maxAgeSeconds: 604800
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i, new workbox.StaleWhileRevalidate({
    "cacheName": "static-image-assets",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 128,
      maxAgeSeconds: 7776000
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/\.(?:js)$/i, new workbox.StaleWhileRevalidate({
    "cacheName": "static-js-assets",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 128,
      maxAgeSeconds: 7776000
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/\.(?:css|less)$/i, new workbox.StaleWhileRevalidate({
    "cacheName": "static-style-assets",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 64,
      maxAgeSeconds: 7776000
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/\.(?:json|xml|csv)$/i, new workbox.NetworkFirst({
    "cacheName": "static-data-assets",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 64,
      maxAgeSeconds: 7776000
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/\/search.*$/i, new workbox.NetworkFirst({
    "cacheName": "search-pages",
    "networkTimeoutSeconds": 10,
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 32,
      maxAgeSeconds: 604800
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/^(?!.*opentopomap|.*openstreetmap|.*\/trek\/|.*\/service\/).*$/i, new workbox.NetworkFirst({
    "cacheName": "others",
    "networkTimeoutSeconds": 10,
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 512,
      maxAgeSeconds: 7776000
    }), {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');

});
//# sourceMappingURL=sw.js.map
