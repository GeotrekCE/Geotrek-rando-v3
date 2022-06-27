import getNextConfig from 'next/config';
import { MapConfig } from './interface';

export const getMapConfig = (): MapConfig => {
  const {
    publicRuntimeConfig: { map },
  } = getNextConfig();

  return {
    ...map,
    mapClassicLayers: map.mapClassicLayers ?? [
      {
        url: map.mapClassicLayerUrl,
        options: {
          attribution: map.mapCredits,
        },
      },
    ],
    mapSatelliteLayers: map.mapSatelliteLayers ?? [
      {
        url: map.mapSatelliteLayerUrl,
        options: {
          attribution: map.mapSatelliteLayerUrl,
        },
      },
    ],
    mapOfflineLayer: map.mapOfflineLayer ?? {
      url: map.mapClassicLayerUrl,
      options: {
        attribution: map.mapCredits,
      },
    },
  };
};
