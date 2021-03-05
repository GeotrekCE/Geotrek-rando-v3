import { MapConfig } from './interface';

import mapConfig from '../../../config/map.json';
import mapConfigCustom from '../../../customization/config/map.json';

export const getMapConfig = (): MapConfig => ({ ...mapConfig, ...mapConfigCustom });
