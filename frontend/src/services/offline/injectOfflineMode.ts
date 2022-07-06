import L, { LatLngBoundsExpression, Map } from 'leaflet';
import CacheManager from 'services/offline/CacheManager';
import { getMapConfig } from 'components/Map/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LeafletOffline = require('leaflet.offline');

const injectOfflineMode = (map: Map, id: number, center: LatLngBoundsExpression) => {
  const mapConfig = getMapConfig();

  const { mapOfflineLayer, mapClassicLayers, zoomAvailableOffline } = mapConfig;

  const tileLayerOffline = L.tileLayer
    // @ts-ignore no type available in this plugin
    .offline(`${mapOfflineLayer.url}?${id}`, {
      attribution: mapOfflineLayer?.options?.attribution,
      subdomains: 'abc',
      minZoom: Math.min(...(zoomAvailableOffline ?? [])),
    })
    .addTo(map);

  // @ts-ignore no type available in this plugin
  const controlInstance = L.control.savetiles(tileLayerOffline, {
    zoomlevels: mapConfig.zoomAvailableOffline,
    confirm(layer: any, successCallback: () => void) {
      successCallback();
    },
    confirmRemoval(layer: any, successCallback: () => void) {
      successCallback();
    },
    saveText: '',
    rmText: '',
  });

  controlInstance.addTo(map);

  let storageLayer: any;

  const getGeoJsonData = () =>
    LeafletOffline.getStorageInfo(mapOfflineLayer.url).then((data: any) =>
      LeafletOffline.getStoredTilesAsJson(tileLayerOffline, data),
    );

  const addStorageLayer = () => {
    getGeoJsonData().then((geojson: any) => {
      storageLayer = L.geoJSON(geojson).bindPopup(
        (clickedLayer: any) => clickedLayer.feature.properties.key,
      );
    });
  };

  addStorageLayer();

  tileLayerOffline.on('storagesize', (e: any) => {
    CacheManager.registerStorageSize(e.storagesize);

    if (storageLayer) {
      storageLayer.clearLayers();
      getGeoJsonData().then((data: any) => {
        storageLayer.addData(data);
      });
    }
  });

  // events while saving a tile layer
  /*let progress: number;
  tileLayerOffline.on('savestart', (e: any) => {
    progress = 0;
    // @ts-ignore no-underscore-dangle
    document.getElementById('total').innerHTML = e._tilesforSave.length;
  });
  tileLayerOffline.on('savetileend', () => {
    progress += 1;
    // @ts-ignore
    document.getElementById('progress').innerHTML = progress;
  });*/

  const recenter = () => {
    const minZoom = Math.min(...(zoomAvailableOffline ?? []));
    map.setZoom(minZoom);
    map.fitBounds(center);
  };

  controlInstance.recenter = recenter;

  CacheManager.registerControlInstance(controlInstance);

  if (tileLayerOffline.url !== mapClassicLayers[0].url && navigator.onLine) {
    map.removeLayer(tileLayerOffline);
  }

  return controlInstance;
};

export default injectOfflineMode;
