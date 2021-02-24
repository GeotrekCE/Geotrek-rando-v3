import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';

import { useVisibleSectionContext } from 'components/pages/details/VisibleSectionContext';
import {
  Coordinate2D,
  LineStringGeometry,
  PointGeometry,
  PolygonGeometry,
} from 'modules/interface';
import { TrekChildGeometry } from 'modules/details/interface';
import { MapButton } from '../components/MapButton';

import { MarkersWithIcon } from './MarkersWithIcon';
import { TrekMarkersAndCourse } from './TrekMarkersAndCourse';
import { PointsReference } from './PointsReference';
import { TouristicContent } from './TouristicContent';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';
import { AltimetricProfile } from '../components/AltimetricProfile';
import { ControlSection } from '../components/ControlSection';
import { useDetailsMap } from './useDetailsMap';
import { TrekChildren } from './TrekChildren';

interface PointWithIcon {
  location: { x: number; y: number };
  pictogramUri: string;
  name: string;
}

export interface TouristicContentGeometry {
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry;
  pictogramUri: string;
  name: string;
}

export type PropsType = {
  poiPoints?: PointWithIcon[];
  touristicContentPoints?: TouristicContentGeometry[];
  trekGeometry?: Coordinate2D[];
  trekGeoJSON: string;
  pointsReference?: Coordinate2D[] | null;
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  openFilterMenu?: () => void;
  hasFilters?: boolean;
  arrivalLocation?: Coordinate2D;
  departureLocation?: Coordinate2D;
  parkingLocation?: Coordinate2D;
  shouldUsePopups?: boolean;
  bbox: { corner1: Coordinate2D; corner2: Coordinate2D };
  trekChildrenGeometry?: TrekChildGeometry[];
};

export const DetailsMap: React.FC<PropsType> = props => {
  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

  const mapConfig = getMapConfig();
  const {
    trekChildrenMobileVisibility,
    toggleTrekChildrenVisibility,
    poiMobileVisibility,
    togglePoiVisibility,
    referencePointsMobileVisibility,
    toggleReferencePointsVisibility,
    touristicContentMobileVisibility,
    toggleTouristicContentVisibility,
  } = useDetailsMap();

  const { visibleSection } = useVisibleSectionContext();

  return (
    <>
      <MapContainer
        scrollWheelZoom
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

        {(visibleSection === 'children' || trekChildrenMobileVisibility === 'DISPLAYED') && (
          <TrekChildren trekChildrenGeometry={props.trekChildrenGeometry} />
        )}

        {(visibleSection === 'description' || referencePointsMobileVisibility === 'DISPLAYED') && (
          <PointsReference pointsReference={props.pointsReference ?? undefined} />
        )}

        {(visibleSection === 'poi' || poiMobileVisibility === 'DISPLAYED') && (
          <MarkersWithIcon points={props.poiPoints} />
        )}

        {(visibleSection === 'touristicContent' ||
          touristicContentMobileVisibility === 'DISPLAYED') && (
          <TouristicContent contents={props.touristicContentPoints} />
        )}
        {props.type === 'DESKTOP' && <AltimetricProfile trekGeoJSON={props.trekGeoJSON} />}
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <ControlSection
        className="desktop:hidden"
        trekChildrenVisibility={
          props.trekChildrenGeometry && props.trekChildrenGeometry.length > 0
            ? trekChildrenMobileVisibility
            : null
        }
        poiVisibility={props.poiPoints && props.poiPoints.length > 0 ? poiMobileVisibility : null}
        referencePointsVisibility={
          props.pointsReference && props.pointsReference.length > 0
            ? referencePointsMobileVisibility
            : null
        }
        touristicContentVisibility={
          props.touristicContentPoints && props.touristicContentPoints.length > 0
            ? touristicContentMobileVisibility
            : null
        }
        toggleTrekChildrenVisibility={toggleTrekChildrenVisibility}
        togglePoiVisibility={togglePoiVisibility}
        toggleReferencePointsVisibility={toggleReferencePointsVisibility}
        toggleTouristicContentVisibility={toggleTouristicContentVisibility}
      />
      <Credits className="absolute right-0 bottom-0 z-mapButton">{mapConfig.mapCredits}</Credits>
    </>
  );
};

export default DetailsMap;
