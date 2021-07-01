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

const redirectsConfig = require('./config/redirects.json');
const customRedirectsConfig = require('./customization/config/redirects.json');

const mergedHeaderConfig = {
  ...headerConfig,
  ...customHeaderConfig,
};

const mergedRedirectsConfig = {
  ...redirectsConfig,
  ...customRedirectsConfig,
};

const env = dotenv.config().parsed;

const plugins = [[withPWA], [withImages], [withSourceMaps()], [withBundleAnalyzer]];

module.exports = withPlugins(plugins, {
  async redirects() {
    return mergedRedirectsConfig.rules.map(rule => ({
      source: rule.source,
      destination: rule.destination,
      permanent: rule.permanent !== undefined ? rule.permanent : false,
      locale: rule.locale !== undefined ? rule.locale : undefined,
      basePath: rule.basePath !== undefined ? rule.basePath : false,
    }));
  },
  webpack(config, { isServer }) {
    config.resolve.modules.push(path.resolve('./src'));
    config.module.rules.push({
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
      },
    });

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

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
});
