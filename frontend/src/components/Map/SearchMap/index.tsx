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
import FullscreenControl from '../components/FullScreenControl';
import LocateControl from '../components/LocateControl';

export type PropsType = {
  segments?: { x: number; y: number }[];
  hideMap?: () => void;
  hasZoomControl?: boolean;
  openFilterMenu?: () => void;
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
    <MapContainer whenCreated={setMapInstance} hasZoomControl={props.hasZoomControl}>
      {props.onMove && <MoveHandler onMove={props.onMove} />}
      <TileLayerManager />
      <BackButton icon={<ArrowLeft size={18} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} />
      {props.hasZoomControl === true && <FullscreenControl />}
      <ResetView />
      <ScaleControl />
      <LocateControl />
      <SearchMapChildrens {...props} />
    </MapContainer>
  );
};

export default SearchMap;
