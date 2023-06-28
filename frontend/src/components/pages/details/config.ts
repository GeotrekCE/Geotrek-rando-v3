import getNextConfig from 'next/config';
import { DetailsConfig } from './interface';

export const getDetailsConfig = (): DetailsConfig => {
  const {
    publicRuntimeConfig: { details },
  } = getNextConfig();

  return details;
};
