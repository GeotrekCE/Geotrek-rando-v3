import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

const sentryOptions = {
  dsn: SENTRY_DSN,
  release: process.env.VERSION,
  environment: process.env.ENVIRONMENT,
  maxBreadcrumbs: 50,
  attachStacktrace: true,
  integrations: [Sentry.replayIntegration()],
};

// Development & tests setup
if (process.env.NODE_ENV !== 'production') {
  // Don't actually send the errors to Sentry
  sentryOptions.beforeSend = () => null;
}

Sentry.init(sentryOptions);
