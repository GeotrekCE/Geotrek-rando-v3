import { getMapConfig } from 'components/Map/config';
import { MapContainer as LeafMapContainer } from 'react-leaflet';
import React, { memo } from 'react';
import { Map } from 'leaflet';

interface Props {
  whenCreated: (map: Map) => void;
  hasZoomControl?: boolean;
  children: React.ReactNode;
}

const MapContainer: React.FC<Props> = ({ children, whenCreated, hasZoomControl = false }) => {
  const mapConfig = getMapConfig();

  return (
    <LeafMapContainer
      className="size-full"
      center={mapConfig.searchMapCenter as [number, number]}
      zoom={mapConfig.searchMapZoom}
      maxZoom={mapConfig.maximumZoomLevel}
      ref={whenCreated}
      scrollWheelZoom
      zoomControl={hasZoomControl}
      id="search_map"
    >
      {children}
    </LeafMapContainer>
  );
};

export default memo(MapContainer, () => true);
