import getNextConfig from 'next/config';
import { HomePageConfig } from './interface';

export const getHomePageConfig = (): HomePageConfig => {
  const {
    publicRuntimeConfig: { home },
  } = getNextConfig();

  return home;
};
