import { getHomePageConfig } from 'modules/home/utils';

export const useHome = () => {
  const homePageConfig = getHomePageConfig();
  return { config: homePageConfig };
};
