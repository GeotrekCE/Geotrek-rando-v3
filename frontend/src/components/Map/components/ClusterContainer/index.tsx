import ClusterGroup from 'next-leaflet-cluster';
import { getMapConfig } from 'components/Map/config';
import { ClusterMarker } from 'components/Map/Markers/Cluster';

interface ClusterContainerProps {
  children: React.ReactNode;
  enabled: boolean;
}

/**
 * Above this zoom level the cluster radius will be highZoomClusterRadius, below it will be lowZoomClusterRadius
 * We discriminate to be able to better see individual markers in high zoom if possible
 */
const clusterRadiusThreshold = 13;
const lowZoomClusterRadius = 40;
const highZoomClusterRadius = 20;
/** Above this zoom level there won't be clustering, the user better sees its trek course on the map when clicking on the marker */
const clusteringMaxZoom = getMapConfig().maximumZoomLevel;

/**
 * Wraps MarkerClusterGroup to enable/disable it easily
 */
export const ClusterContainer: React.FC<ClusterContainerProps> = ({ children, enabled }) => (
  <ClusterGroup
    iconCreateFunction={ClusterMarker}
    maxClusterRadius={
      enabled
        ? (zoom: number) =>
            zoom <= clusterRadiusThreshold ? lowZoomClusterRadius : highZoomClusterRadius
        : 0
    }
    disableClusteringAtZoom={clusteringMaxZoom}
    spiderfyOnMaxZoom
  >
    {children}
  </ClusterGroup>
);
