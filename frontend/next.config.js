const path = require('path');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps');
const withPWA = require('next-pwa');
const dotenv = require('dotenv-flow');
const yup = require('yup');
const runtimeCachingStrategy = require('./cache');
const headerConfig = require('./config/header.json');

const env = dotenv.config().parsed;

const plugins = [[withPWA], [withImages], [withSourceMaps()]];

module.exports = withPlugins(plugins, {
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
    locales: headerConfig.menu.supportedLanguages,
    defaultLocale: headerConfig.menu.defaultLanguage,
  },
});
