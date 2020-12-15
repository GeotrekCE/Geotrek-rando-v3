const path = require('path');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps');
const dotenv = require('dotenv-flow');
const yup = require('yup');

const schema = yup.object().shape({
  REACT_APP_API_BASE_URL: yup.string().required(),
});

const env = dotenv.config().parsed;

try {
  schema.validateSync({ ...process.env, ...env }, { stripUnknown: true, abortEarly: false });
} catch (error) {
  const multipleErrors = error.inner.length > 1;
  const concatenatedMissingEnvVars = error.inner.map(({ path }) => path).join(', ');
  throw new Error(
    `${concatenatedMissingEnvVars} ${multipleErrors ? 'are' : 'is'} missing please add ${
      multipleErrors ? 'them' : 'it'
    } to your env file`,
  );
}

const plugins = [
  [
    withCSS,
    {
      cssLoaderOptions: {
        url: false,
      },
      cssModules: true,
    },
  ],
  [withImages],
  [withSourceMaps()],
];

module.exports = withPlugins(plugins, {
  webpack(config, { isServer }) {
    config.resolve.modules.push(path.resolve('./src'));

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
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
});
