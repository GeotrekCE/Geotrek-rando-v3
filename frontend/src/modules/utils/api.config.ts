// This module is mocked in jestAfterEnv so that tests don't depend on the config

import { APICallsConfig } from 'modules/interface';

import apiCallsConfig from '../../../config/apiCalls.json';

export const getApiCallsConfig = (): APICallsConfig => apiCallsConfig;
