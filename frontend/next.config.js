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
const { getConfig, getTemplates } = require('./src/services/getConfig');
const { getLocales } = require('./src/services/getLocales');
const { withSentryConfig } = require('@sentry/nextjs');

const mergedHeaderConfig = {
  ...headerConfig,
  ...customHeaderConfig,
};

const env = dotenv.config().parsed;

const plugins = [[withPWA], [withSourceMaps()], [withBundleAnalyzer], (nextConfig) => withSentryConfig(nextConfig, { silent: true })];

module.exports = withPlugins(plugins, {
  webpack(config) {
    config.resolve.modules.push(path.resolve('./src'));
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
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: true, //process.env.SENTRY_DSN === undefined,
    disableClientWebpackPlugin: true //process.env.SENTRY_DSN === undefined,
  },
  publicRuntimeConfig: {
    homeBottomHtml: getTemplates(
      '../html/homeBottom.html',
      mergedHeaderConfig.menu.supportedLanguages,
    ),
    homeTopHtml: getTemplates(
      '../html/homeTop.html',
      mergedHeaderConfig.menu.supportedLanguages,
    ),
    headerTopHtml: getTemplates(
      '../html/headerTop.html',
      mergedHeaderConfig.menu.supportedLanguages,
    ),
    headerBottomHtml: getTemplates(
      '../html/headerBottom.html',
      mergedHeaderConfig.menu.supportedLanguages,
    ),
    footerTopHtml: getTemplates(
      '../html/footerTop.html',
      mergedHeaderConfig.menu.supportedLanguages,
    ),
    footerBottomHtml: getTemplates(
      '../html/footerBottom.html',
      mergedHeaderConfig.menu.supportedLanguages,
    ),
    scriptsHeaderHtml: getConfig('../html/scriptsHeader.html', false),
    scriptsFooterHtml: getConfig('../html/scriptsFooter.html', false),
    style: getConfig('../theme/style.css', false),
    colors: getConfig('../theme/colors.json', true),
    header: getConfig('header.json', true),
    global: getConfig('global.json', true),
    home: getConfig('home.json', true),
    map: getConfig('map.json', true),
    filter: getConfig('filter.json', true),
    footer: getConfig('footer.json', true),
    manifest: getConfig('manifest.json', true),
    locales: getLocales(mergedHeaderConfig.menu.supportedLanguages),
  },
});
