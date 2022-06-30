import MapContainer from 'components/Map/SearchMap/MapContainer';
import MoveHandler from 'components/Map/SearchMap/MoveHandler';
import SearchMapChildrens from 'components/Map/SearchMap/SearchMapChildrens';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import { ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { useTileLayer } from 'hooks/useTileLayer';
import { BackButton } from '../components/BackButton';
import { FilterButton } from '../components/FilterButton';
import { ResetView } from '../components/ResetView';
import TileLayerManager from '../components/TileLayerManager';

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

  const { setMapInstance } = useTileLayer();

  return (
    <MapContainer whenCreated={setMapInstance} type={props.type}>
      {props.onMove && <MoveHandler onMove={props.onMove} />}
      <TileLayerManager />
      <BackButton icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} hasFilters={props.hasFilters} />
      <ResetView />
      <ScaleControl />
      <SearchMapChildrens {...props} />
    </MapContainer>
  );
};

export default SearchMap;
