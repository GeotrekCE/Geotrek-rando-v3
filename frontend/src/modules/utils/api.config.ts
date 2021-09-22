// This module is mocked in jestAfterEnv so that tests don't depend on the config

import { APICallsConfig } from 'modules/interface';
import getNextConfig from 'next/config';

export const getGlobalConfig = (): APICallsConfig => {
  const {
    publicRuntimeConfig: { global },
  } = getNextConfig();

  return global;
};

export const portalsFilter =
  getGlobalConfig().portalIds.length > 0
    ? {
        portals: getGlobalConfig().portalIds.join(','),
      }
    : {};
