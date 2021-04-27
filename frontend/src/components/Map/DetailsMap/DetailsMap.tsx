import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';

import {
  Coordinate2D,
  LineStringGeometry,
  PointGeometry,
  PolygonGeometry,
} from 'modules/interface';
import { useTileLayer } from 'hooks/useTileLayer';
import {
  MapLayerTypeToggleButton,
  TileLayerType,
} from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { TrekChildGeometry } from 'modules/details/interface';
import { SensitiveAreaGeometry } from 'modules/sensitiveArea/interface';
import { MapButton } from '../components/MapButton';

import { TrekMarkersAndCourse } from './TrekMarkersAndCourse';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';
import { AltimetricProfile } from '../components/AltimetricProfile';
import { ControlSection } from '../components/ControlSection';
import { useDetailsMap } from './useDetailsMap';
import { MapChildren, PointWithIcon } from './MapChildren';

export interface TouristicContentGeometry {
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry;
  pictogramUri: string;
  name: string;
  id: string;
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
  sensitiveAreas?: SensitiveAreaGeometry[];
};

export const DetailsMap: React.FC<PropsType> = props => {
  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

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
  const mapConfig = getMapConfig();

  const { isSatelliteLayerAvailable, setMapInstance, updateTileLayer } = useTileLayer();

  return (
    <>
      <MapContainer
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
        zoomControl={props.type === 'DESKTOP'}
        attributionControl={false}
        whenCreated={setMapInstance}
        bounds={[
          [props.bbox.corner1.y, props.bbox.corner1.x],
          [props.bbox.corner2.y, props.bbox.corner2.x],
        ]}
      >
        <TileLayer url={mapConfig.mapClassicLayerUrl} />
        <TrekMarkersAndCourse
          arrivalLocation={props.arrivalLocation}
          departureLocation={props.departureLocation}
          parkingLocation={props.parkingLocation}
          trekGeometry={props.trekGeometry}
        />
        <MapChildren
          poiPoints={props.poiPoints}
          touristicContentPoints={props.touristicContentPoints}
          pointsReference={props.pointsReference}
          trekChildrenGeometry={props.trekChildrenGeometry}
          sensitiveAreasGeometry={props.sensitiveAreas}
          trekChildrenMobileVisibility={trekChildrenMobileVisibility}
          poiMobileVisibility={poiMobileVisibility}
          referencePointsMobileVisibility={referencePointsMobileVisibility}
          touristicContentMobileVisibility={touristicContentMobileVisibility}
        />
        {props.type === 'DESKTOP' && <AltimetricProfile trekGeoJSON={props.trekGeoJSON} />}
        {isSatelliteLayerAvailable && (
          <div className="absolute bottom-6 left-6 z-mapButton">
            <MapLayerTypeToggleButton onToggleButtonClick={newType => updateTileLayer(newType)} />
          </div>
        )}
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
