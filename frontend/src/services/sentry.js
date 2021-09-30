// Borrowed from https://github.com/zeit/next.js/blob/master/examples/with-sentry/utils/sentry.js
const makeSentry = (release = process.env.VERSION) => {
  const Sentry =
    typeof window !== 'undefined' ? require('@sentry/browser') : require('@sentry/node');

  const sentryOptions = {
    dsn: process.env.SENTRY_DSN,
    release,
    environment: process.env.ENVIRONMENT,
    maxBreadcrumbs: 50,
    attachStacktrace: true,
  };

  // Development & tests setup
  if (process.env.NODE_ENV !== 'production') {
    // Don't actually send the errors to Sentry
    sentryOptions.beforeSend = () => null;
  }

  Sentry.init(sentryOptions);

  return {
    Sentry,
    captureException: (err, ctx) => {
      Sentry.configureScope(scope => {
        if (err.message) {
          // De-duplication currently doesn't work correctly for SSR / browser errors
          // so we force deduplication by error message if it is present
          scope.setFingerprint([err.message]);
        }

        if (err.statusCode) {
          scope.setExtra('statusCode', err.statusCode);
        }

        if (ctx) {
          const { req, res, errorInfo, query, pathname } = ctx;

          if (res && res.statusCode) {
            scope.setExtra('statusCode', res.statusCode);
          }

          if (typeof window !== 'undefined') {
            scope.setTag('ssr', 'false');
            scope.setExtra('query', query);
            scope.setExtra('pathname', pathname);
          } else {
            scope.setTag('ssr', 'true');
            scope.setExtra('url', req.url);
            scope.setExtra('method', req.method);
            scope.setExtra('headers', req.headers);
            scope.setExtra('params', req.params);
            scope.setExtra('query', req.query);
          }

          if (errorInfo) {
            Object.keys(errorInfo).forEach(key => scope.setExtra(key, errorInfo[key]));
          }
        }
      });

      return Sentry.captureException(err);
    },
  };
};

module.exports = makeSentry();
