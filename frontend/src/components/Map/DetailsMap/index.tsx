import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';

import { DetailsSections } from 'components/pages/details/useDetails';

import { Coordinate2D } from 'modules/interface';
import { MapButton } from '../components/MapButton';
import { FilterButton } from '../components/FilterButton';

import { MarkersWithIcon } from './MarkersWithIcon';
import { TrekMarkersAndCourse } from './TrekMarkersAndCourse';
import { PointsReference } from './PointsReference';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';

interface PointWithIcon {
  location: { x: number; y: number };
  pictogramUri: string;
  name: string;
}

export type PropsType = {
  poiPoints?: PointWithIcon[];
  touristicContentPoints?: PointWithIcon[];
  trekGeometry?: Coordinate2D[];
  pointsReference?: Coordinate2D[] | null;
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  openFilterMenu?: () => void;
  hasFilters?: boolean;
  arrivalLocation?: Coordinate2D;
  departureLocation?: Coordinate2D;
  parkingLocation?: Coordinate2D;
  shouldUsePopups?: boolean;
  elementOnScreen: DetailsSections | null;
  bbox: { corner1: { x: number; y: number }; corner2: { x: number; y: number } };
};

const DetailsMap: React.FC<PropsType> = props => {
  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

  const mapConfig = getMapConfig();

  return (
    <>
      <MapContainer
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        zoomControl={props.type === 'DESKTOP'}
        bounds={[
          [props.bbox.corner1.y, props.bbox.corner1.x],
          [props.bbox.corner2.y, props.bbox.corner2.x],
        ]}
        attributionControl={false}
      >
        <TileLayer url={mapConfig.mapLayerUrl} />
        <TrekMarkersAndCourse
          arrivalLocation={props.arrivalLocation}
          departureLocation={props.departureLocation}
          parkingLocation={props.parkingLocation}
          trekGeometry={props.trekGeometry}
        />

        {props.elementOnScreen === 'description' && (
          <PointsReference pointsReference={props.pointsReference ?? undefined} />
        )}

        {props.elementOnScreen === 'poi' && <MarkersWithIcon points={props.poiPoints} />}

        {props.elementOnScreen === 'touristicContent' && (
          <MarkersWithIcon points={props.touristicContentPoints} />
        )}
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} hasFilters={props.hasFilters} />
      <Credits className="absolute right-0 bottom-0 z-mapButton">{mapConfig.mapCredits}</Credits>
    </>
  );
};

export default DetailsMap;
