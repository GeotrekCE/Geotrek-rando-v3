const compression = require('compression');
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 80;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();
const { Sentry } = require('./services/sentry');

app.prepare().then(() => {
  const server = express();

  server.use(Sentry.Handlers.requestHandler());
  server.use(compression());

  server.get('/health', (req, res) => {
    return res.json({ status: 'pass' });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use(Sentry.Handlers.errorHandler());

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
