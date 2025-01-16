import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

const sentryOptions = {
  dsn: SENTRY_DSN,
  release: process.env.VERSION,
  environment: process.env.ENVIRONMENT,
  maxBreadcrumbs: 50,
  attachStacktrace: true,
  integrations: [Sentry.replayIntegration()],
} as Sentry.BrowserOptions;

// Development & tests setup
if (process.env.NODE_ENV !== 'production') {
  // Don't actually send the errors to Sentry
  sentryOptions.beforeSend = () => null;
}

if (SENTRY_DSN) {
  Sentry.init(sentryOptions);
}
