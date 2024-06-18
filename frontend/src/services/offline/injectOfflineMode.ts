import L, { LatLngBoundsExpression, Layer, Map } from 'leaflet';
import CacheManager from 'services/offline/CacheManager';
import { getMapConfig } from 'components/Map/config';

import {
  ControlSaveTiles,
  getStorageInfo,
  getStoredTilesAsJson,
  savetiles as Lsavetiles,
  tileLayerOffline as LtileLayerOffline,
  TileLayerOffline,
} from 'leaflet.offline';

type EventStorageSize = TileLayerOffline & {
  storagesize: ControlSaveTiles;
};

const injectOfflineMode = (map: Map, id: number, center: LatLngBoundsExpression) => {
  const mapConfig = getMapConfig();

  const { mapOfflineLayer, mapClassicLayers, zoomAvailableOffline } = mapConfig;

  const tileLayerOffline = LtileLayerOffline(`${mapOfflineLayer.url}?${id}`, {
    attribution: mapOfflineLayer?.options?.attribution,
    subdomains: 'abc',
    minZoom: Math.min(...(zoomAvailableOffline ?? [])),
  });

  tileLayerOffline.addTo(map);

  const controlInstance: ControlSaveTiles = Lsavetiles(tileLayerOffline, {
    zoomlevels: mapConfig.zoomAvailableOffline,
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

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  let storageLayer: L.GeoJSON;

  const getGeoJsonData = () =>
    getStorageInfo(mapOfflineLayer.url).then(data => getStoredTilesAsJson(tileLayerOffline, data));

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

  const recenter = () => {
    const minZoom = Math.min(...(zoomAvailableOffline ?? []));
    map.setZoom(minZoom);
    map.fitBounds(center);
  };

  // @ts-expect-error add method to access in the cache manager
  controlInstance.recenter = recenter;

  CacheManager.registerControlInstance(controlInstance);

  // @ts-expect-error add method to access in the cache manager
  if (tileLayerOffline.url !== mapClassicLayers[0].url && navigator.onLine) {
    map.removeLayer(tileLayerOffline);
  }

  return controlInstance;
};

export default injectOfflineMode;
