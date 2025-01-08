import withPlugins from 'next-compose-plugins';
import withSourceMaps from '@zeit/next-source-maps';
// https://github.com/vercel/next.js/discussions/29697
import bundleAnalyzer from '@next/bundle-analyzer';
import runtimeCachingStrategy from './src/worker/runtimeCaching.js';
import headerConfig from './config/header.json' with { type: 'json' };
import customHeaderConfig from './customization/config/header.json' with { type: 'json' };
import { getAllConfigs } from './src/services/getConfig.js';
import { withSentryConfig } from '@sentry/nextjs';

const revision = crypto.randomUUID();

const withSerwist = (await import('@serwist/next')).default({
  swSrc: 'worker/sw.ts',
  swDest: 'public/sw.js',
  exclude: [/public\/sw.js/],
  scope: '/',
  // disable: process.env.ENVIRONMENT === 'development',
  additionalPrecacheEntries: [
    { url: '/', revision },
    { url: '/~offline', revision },
  ],
});

const mergedHeaderConfig = {
  ...headerConfig,
  ...customHeaderConfig,
};

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
