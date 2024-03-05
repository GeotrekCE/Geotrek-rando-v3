import { fetchAPIVersion } from './api';
import { APIVersion } from './interface';

export const getAPIVersion = async (): Promise<APIVersion> => {
  try {
    return fetchAPIVersion();
  } catch {
    return {
      version: '0.0.1',
    };
  }
};
