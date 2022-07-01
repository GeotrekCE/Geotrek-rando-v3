import getNextConfig from 'next/config';
import { MapConfig } from './interface';

export const getMapConfig = (): MapConfig => {
  const {
    publicRuntimeConfig: { map },
  } = getNextConfig();

  return {
    ...map,
    mapOfflineLayer: map.mapOfflineLayer ?? map.mapClassicLayers[0],
  };
};
