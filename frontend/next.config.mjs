import path from 'path';
import withPlugins from 'next-compose-plugins';
import withSourceMaps from '@zeit/next-source-maps';
import dotenv from 'dotenv-flow';
import { runtimeConfig } from './src/services/getConfig.mjs';
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

const env = dotenv.config().parsed;

const withBundleAnalyzer =
  process.env.ANALYZE === 'true' ? (await import('@next/bundle-analyzer')).default() : x => x;

const plugins = [
  [withSourceMaps()],
  [withBundleAnalyzer],
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
    locales: runtimeConfig.header.menu.supportedLanguages,
    defaultLocale: runtimeConfig.header.menu.defaultLanguage,
  },
  publicRuntimeConfig: runtimeConfig,
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
