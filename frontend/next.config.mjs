import path from 'path';
import withPlugins from 'next-compose-plugins';
import withSourceMaps from '@zeit/next-source-maps';
import dotenv from 'dotenv-flow';
import runtimeCachingStrategy from './cache.js';
import headerConfig from './config/header.json' with { type: 'json' };
import customHeaderConfig from './customization/config/header.json' with { type: 'json' };
import { getAllConfigs } from './src/services/getConfig.mjs';
import { withSentryConfig } from '@sentry/nextjs';
import withPWA from 'next-pwa';

withPWA({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  runtimeCaching: runtimeCachingStrategy,
});

const mergedHeaderConfig = {
  ...headerConfig,
  ...customHeaderConfig,
};

const env = dotenv.config().parsed;

const withBundleAnalyzer =
  process.env.ANALYZE === 'true' ? (await import('@next/bundle-analyzer')).default() : x => x;

const plugins = [
  [withPWA],
  [withSourceMaps()],
  [withBundleAnalyzer],
  nextConfig =>
    withSentryConfig(nextConfig, {
      hideSourceMaps: true,
      disableServerWebpackPlugin: true,
      disableClientWebpackPlugin: true,
      silent: true,
    }),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
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
};

export default async (phase, { defaultConfig }) =>
  withPlugins(plugins, nextConfig)(phase, { ...defaultConfig, ...nextConfig });
