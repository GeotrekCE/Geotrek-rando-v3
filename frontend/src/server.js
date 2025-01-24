const compression = require('compression');
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();
const { getConfig } = require('./services/getConfig.mjs');

app.prepare().then(() => {
  const server = express();

  server.use(compression());

  server.get('/health', (req, res) => {
    return res.json({ status: 'pass' });
  });

  const redirectsConfig = getConfig('redirects.json');
  const baseUrl = getConfig('global.json').baseUrl;
  redirectsConfig.rules.forEach(rule => {
    server.get(rule.source, (req, res) => {
      let newRoute = rule.destination;
      Object.keys(req.params).forEach(param => {
        newRoute = newRoute.replace(':' + param, req.params[param]);
      });
      res.writeHead(rule.permanent ? 301 : 302, { location: baseUrl + newRoute });

      res.end();
    });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
