import { TileLayerOptions } from 'leaflet';
export interface TileLayer {
  url: string;
  options?: TileLayerOptions;
  bounds?: string;
}

export interface MapConfig {
  searchMapCenter: number[];
  maximumZoomLevel: number;
  searchMapZoom: number;
  mapCredits: string;
  mapClassicLayerUrl: string;
  mapSatelliteLayerUrl?: string;
  mapClassicLayers: TileLayer[];
  mapSatelliteLayers: TileLayer[];
  mapOfflineLayer: TileLayer;
  zoomAvailableOffline?: number[];
}
