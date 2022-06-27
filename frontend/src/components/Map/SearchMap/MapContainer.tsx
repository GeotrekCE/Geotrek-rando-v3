import { getMapConfig } from 'components/Map/config';
import { MapContainer as LeafMapContainer } from 'react-leaflet';
import React, { memo } from 'react';

interface Props {
  whenCreated: (map: any) => void;
  type: string;
  children: React.ReactNode;
}

const MapContainer: React.FC<Props> = ({ children, whenCreated, type }) => {
  const mapConfig = getMapConfig();

  return (
    <LeafMapContainer
      center={mapConfig.searchMapCenter as [number, number]}
      zoom={mapConfig.searchMapZoom}
      maxZoom={mapConfig.maximumZoomLevel}
      whenCreated={whenCreated}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
      zoomControl={type === 'DESKTOP'}
      id="search_map"
    >
      {children}
    </LeafMapContainer>
  );
};

export default memo(MapContainer, () => true);
