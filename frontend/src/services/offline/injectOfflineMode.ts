import L, { LatLngBounds, LatLngBoundsExpression, Layer, Map } from 'leaflet';
import CacheManager from 'services/offline/CacheManager';
import { getMapConfig } from 'components/Map/config';

import {
  ControlSaveTiles,
  getStorageInfo,
  getStoredTilesAsJson,
  tileLayerOffline as LtileLayerOffline,
  savetiles,
  TileLayerOffline,
} from 'leaflet.offline';

type EventStorageSize = TileLayerOffline & {
  storagesize: ControlSaveTiles;
};

const injectOfflineMode = (map: Map, id: number, bounds: LatLngBoundsExpression) => {
  const { mapOfflineLayer, mapClassicLayers, zoomAvailableOffline } = getMapConfig();

  const tileLayerOffline = LtileLayerOffline(`${mapOfflineLayer.url}?${id}`, {
    attribution: mapOfflineLayer?.options?.attribution,
    subdomains: 'abc',
  });

  tileLayerOffline.addTo(map);

  const controlInstance: ControlSaveTiles = savetiles(tileLayerOffline, {
    zoomlevels: zoomAvailableOffline,
    bounds: (bounds as LatLngBounds) ?? null,
    confirm(_layer: Layer, successCallback: () => void) {
      successCallback();
    },
    confirmRemoval(_layer: Layer, successCallback: () => void) {
      successCallback();
    },
    saveText: '',
    rmText: '',
  });

  controlInstance.addTo(map);

  let storageLayer: L.GeoJSON;

  const getGeoJsonData = () =>
    getStorageInfo(mapOfflineLayer.url).then(data =>
      getStoredTilesAsJson(tileLayerOffline.getTileSize(), data),
    );

  const addStorageLayer = () => {
    void getGeoJsonData().then(geojson => {
      storageLayer = L.geoJSON(geojson).bindPopup(
        (clickedLayer: any) => clickedLayer.feature.properties.key,
      );
    });
  };

  addStorageLayer();
  // @ts-expect-error the lib is not typed
  tileLayerOffline.on('storagesize', (event: EventStorageSize) => {
    CacheManager.registerStorageSize(event.storagesize);

    if (storageLayer) {
      storageLayer.clearLayers();
      void getGeoJsonData().then(data => {
        storageLayer.addData(data);
      });
    }
  });

  // @ts-expect-error add method to access in the cache manager
  if (tileLayerOffline.url !== mapClassicLayers[0].url && navigator.onLine) {
    map.removeLayer(tileLayerOffline);
  }

  return controlInstance;
};

export default injectOfflineMode;
