import MapContainer from 'components/Map/SearchMap/MapContainer';
import MoveHandler from 'components/Map/SearchMap/MoveHandler';
import SearchMapChildrens from 'components/Map/SearchMap/SearchMapChildrens';
import { MapLayerTypeToggleButton } from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import { TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { useTileLayer } from 'hooks/useTileLayer';
import { MapButton } from '../components/MapButton';
import { FilterButton } from '../components/FilterButton';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';

export type PropsType = {
  segments?: { x: number; y: number }[];
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  openFilterMenu?: () => void;
  hasFilters?: boolean;
  arrivalLocation?: { x: number; y: number };
  departureLocation?: { x: number; y: number };
  parkingLocation?: { x: number; y: number };
  shouldUseClusters?: boolean;
  shouldUsePopups?: boolean;
  onMove?: (bounds: LatLngBounds) => void;
};

const SearchMap: React.FC<PropsType> = props => {
  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

  const mapConfig = getMapConfig();

  const { isSatelliteLayerAvailable, setMapInstance, updateTileLayer } = useTileLayer();

  return (
    <>
      <MapContainer whenCreated={setMapInstance} type={props.type}>
        {props.onMove && <MoveHandler onMove={props.onMove} />}
        <TileLayer url={mapConfig.mapClassicLayerUrl} />
        <SearchMapChildrens {...props} />
      </MapContainer>
      {isSatelliteLayerAvailable && (
        <div className="absolute bottom-6 left-6 z-mapButton">
          <MapLayerTypeToggleButton onToggleButtonClick={updateTileLayer} />
        </div>
      )}
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} hasFilters={props.hasFilters} />
      <Credits className="absolute right-0 bottom-0 z-mapButton">{mapConfig.mapCredits}</Credits>
    </>
  );
};

export default SearchMap;
