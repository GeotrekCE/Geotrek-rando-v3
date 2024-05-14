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
  mapClassicLayers: TileLayer[];
  mapSatelliteLayers: TileLayer[] | null;
  mapOfflineLayer: TileLayer;
  zoomAvailableOffline?: number[];
  mobileMapPanelDefaultOpened: boolean;
  displaySecondaryLayersByDefault: boolean;
}
