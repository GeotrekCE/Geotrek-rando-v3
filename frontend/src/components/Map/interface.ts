export interface MapConfig {
  searchMapCenter: number[];
  maximumZoomLevel: number;
  searchMapZoom: number;
  mapCredits: string;
  mapClassicLayerUrl: string;
  mapClassicLayerUrlOffline?: string;
  mapSatelliteLayerUrl?: string;
  zoomAvailableOffline?: number[];
}
