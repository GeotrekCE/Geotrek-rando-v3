export async function register() {
  if (process.env.SENTRY_DSN && process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
}
