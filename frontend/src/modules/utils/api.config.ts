// This module is mocked in jestAfterEnv so that tests don't depend on the config

import { APICallsConfig } from 'modules/interface';

import apiCallsConfig from '../../../config/apiCalls.json';
import structureApiCallsConfig from '../../../customization/config/apiCalls.json';

export const getApiCallsConfig = (): APICallsConfig => ({
  ...apiCallsConfig,
  ...structureApiCallsConfig,
});

export const portalsFilter =
  getApiCallsConfig().portalIds.length > 0
    ? {
        portals: getApiCallsConfig().portalIds.join(','),
      }
    : {};
