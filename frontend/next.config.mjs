import path from 'path';
import withPlugins from 'next-compose-plugins';
import withSourceMaps from '@zeit/next-source-maps';
import bundleAnalyzer from '@next/bundle-analyzer';
import dotenv from 'dotenv-flow';
import headerConfig from './config/header.json' with { type: 'json' };
import customHeaderConfig from './customization/config/header.json' with { type: 'json' };
import { getAllConfigs } from './src/services/getConfig.js';
import { withSentryConfig } from '@sentry/nextjs';
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: 'worker/sw.ts',
  swDest: 'public/sw.js',
  scope: '/',
  disable: process.env.NODE_ENV === 'development',
  additionalPrecacheEntries: [{ url: '/offline', revision: crypto.randomUUID() }],
});

const mergedHeaderConfig = {
  ...headerConfig,
  ...customHeaderConfig,
};

const env = dotenv.config().parsed;

const plugins = [
  [withSourceMaps()],
  process.env.ANALYZE === 'true' ? [bundleAnalyzer()] : x => x,
  nextConfig =>
    withSentryConfig(nextConfig, {
      hideSourceMaps: true,
      disableServerWebpackPlugin: true,
      disableClientWebpackPlugin: true,
      silent: true,
    }),
  nextConfig => withSerwist(nextConfig),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.modules.push(path.resolve('./src'));

    if (typeof config.webpack === 'function') {
      return config.webpack(config, options);
    }

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
  publicRuntimeConfig: getAllConfigs,
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
    scrollRestoration: true,
  },
  reactStrictMode: true,
};

export default async (phase, { defaultConfig }) =>
  withPlugins(plugins, nextConfig)(phase, { ...defaultConfig, ...nextConfig });
