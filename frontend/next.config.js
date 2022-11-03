const path = require('path');
const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps');
// https://github.com/vercel/next.js/discussions/29697
const withBundleAnalyzer =
  process.env.ANALYZE === 'true' ? require('@next/bundle-analyzer')() : x => x;
const dotenv = require('dotenv-flow');
const runtimeCachingStrategy = require('./cache');
const headerConfig = require('./config/header.json');
const customHeaderConfig = require('./customization/config/header.json');
const { getAllConfigs } = require('./src/services/getConfig');
const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  runtimeCaching: runtimeCachingStrategy,
});

const mergedHeaderConfig = {
  ...headerConfig,
  ...customHeaderConfig,
};

const env = dotenv.config().parsed;

const plugins = [
  [withPWA],
  [withSourceMaps()],
  [withBundleAnalyzer],
  nextConfig => withSentryConfig(nextConfig, { silent: true }),
];

module.exports = withPlugins(plugins, {
  webpack(config) {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
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
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: true, //process.env.SENTRY_DSN === undefined,
    disableClientWebpackPlugin: true, //process.env.SENTRY_DSN === undefined,
  },
  publicRuntimeConfig: getAllConfigs,
  compiler: {
    styledComponents: true,
  },
});
