// This module is mocked in jestAfterEnv so that tests don't depend on the config

import { APICallsConfig } from 'modules/interface';

import apiCallsConfig from '../../../config/global.json';
import structureApiCallsConfig from '../../../customization/config/global.json';

export const getGlobalConfig = (): APICallsConfig => ({
  ...apiCallsConfig,
  ...structureApiCallsConfig,
});

export const portalsFilter =
  getGlobalConfig().portalIds.length > 0
    ? {
        portals: getGlobalConfig().portalIds.join(','),
      }
    : {};
