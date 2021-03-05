import { HomePageConfig } from './interface';
import homePageConfig from '../../../config/home.json';
import customHomePageConfig from '../../../customization/config/home.json';

export const getHomePageConfig = (): HomePageConfig => ({
  ...homePageConfig,
  ...customHomePageConfig,
});
