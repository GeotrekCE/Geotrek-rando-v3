const path = require('path');
const withImages = require('next-images');
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

const plugins = [[withPWA], [withImages], [withSourceMaps()], [withBundleAnalyzer]];

const redirects = async () => {
  const redirectsConfig = getConfig('redirects.json');

  return redirectsConfig.rules.map(rule => ({
    source: rule.source,
    destination: rule.destination,
    permanent: rule.permanent !== undefined ? rule.permanent : false,
    locale: rule.locale !== undefined ? rule.locale : undefined,
    basePath: rule.basePath !== undefined ? rule.basePath : false,
  }));
};

module.exports = withPlugins(plugins, {
  redirects,
  webpack(config) {
    config.resolve.modules.push(path.resolve('./src'));

    return config;
  },
  pwa: {
    dest: 'public',
    runtimeCaching: runtimeCachingStrategy,
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
    header: getConfig('header.json', true),
    global: getConfig('global.json', true),
    home: getConfig('home.json', true),
    map: getConfig('map.json', true),
    filter: getConfig('filter.json', true),
    footer: getConfig('footer.json', true),
  },
});
