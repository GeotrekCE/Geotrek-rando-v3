import { MapConfig } from './interface';

import mapConfig from '../../../config/map.json';

export const getMapConfig = (): MapConfig => mapConfig as { searchMapCenter: [number, number] };
