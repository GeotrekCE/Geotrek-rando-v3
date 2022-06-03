import MapContainer from 'components/Map/SearchMap/MapContainer';
import MoveHandler from 'components/Map/SearchMap/MoveHandler';
import SearchMapChildrens from 'components/Map/SearchMap/SearchMapChildrens';
import { MapLayerTypeToggleButton } from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import { ScaleControl, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { useTileLayer } from 'hooks/useTileLayer';
import { BackButton } from '../components/BackButton';
import { FilterButton } from '../components/FilterButton';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';
import { ResetView } from '../components/ResetView';

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

  const { setMapInstance } = useTileLayer();

  return (
    <MapContainer whenCreated={setMapInstance} type={props.type}>
      {props.onMove && <MoveHandler onMove={props.onMove} />}
      <TileLayer url={mapConfig.mapClassicLayerUrl} />
      <BackButton icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} hasFilters={props.hasFilters} />
      <ResetView />
      <ScaleControl />
      <MapLayerTypeToggleButton />
      <Credits>{mapConfig.mapCredits}</Credits>
      <SearchMapChildrens {...props} />
    </MapContainer>
  );
};

export default SearchMap;
