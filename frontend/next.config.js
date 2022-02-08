const path = require('path');
const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps');
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const dotenv = require('dotenv-flow');
const runtimeCachingStrategy = require('./cache');
const headerConfig = require('./config/header.json');
const customHeaderConfig = require('./customization/config/header.json');
const getConfig = require('./src/services/getConfig');

const mergedHeaderConfig = {
  ...headerConfig,
  ...customHeaderConfig,
};

const env = dotenv.config().parsed;

const plugins = [[withPWA], [withSourceMaps()], [withBundleAnalyzer]];

module.exports = withPlugins(plugins, {
  webpack(config) {
    config.resolve.modules.push(path.resolve('./src'));
    Object.assign(config.resolve.alias, {
      // GSAP aliases are useful for rando3D package
      "EasePack": "gsap/src/uncompressed/easing/EasePack.js",
      "TweenLite": "gsap/src/uncompressed/TweenLite.js",
      "TimelineLite": "gsap/src/uncompressed/TimelineLite.js",
      "BezierPlugin": "gsap/src/uncompressed/plugins/BezierPlugin.js",
      "DirectionalRotationPlugin": "gsap/src/uncompressed/plugins/DirectionalRotationPlugin.js"
    });
    return config;
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching: runtimeCachingStrategy,
    fallbacks: {
      document: '/_offline',
    },
  },
  /**
   * environment variables that will be shared for the client and server-side
   */
  env: {
    ...env,
    ENVIRONMENT: process.env.ENVIRONMENT,
    SENTRY_DSN: process.env.SENTRY_DSN,
    VERSION: process.env.VERSION,
  },
  i18n: {
    locales: mergedHeaderConfig.menu.supportedLanguages,
    defaultLocale: mergedHeaderConfig.menu.defaultLanguage,
  },
  publicRuntimeConfig: {
    homeBottomHtml: getConfig('../html/homeBottom.html', false),
    homeTopHtml: getConfig('../html/homeTop.html', false),
    style: getConfig('../theme/style.css', false),
    colors: getConfig('../theme/colors.json', true),
    header: getConfig('header.json', true),
    global: getConfig('global.json', true),
    home: getConfig('home.json', true),
    map: getConfig('map.json', true),
    filter: getConfig('filter.json', true),
    footer: getConfig('footer.json', true),
  },
});
