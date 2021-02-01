import headerConfig from '../../../config/header.json';
import structureHeaderConfig from '../../../customization/config/header.json';
import { HeaderConfig } from './interface';

export const getHeaderConfig = (): HeaderConfig => ({
  ...headerConfig,
  ...structureHeaderConfig,
});
