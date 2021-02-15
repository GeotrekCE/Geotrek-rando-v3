import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { Bbox } from 'modules/details/interface';
import { LineStringGeometry, PointGeometry, PolygonGeometry } from 'modules/interface';
import { MapButton } from '../components/MapButton';

import { TouristicContent } from '../DetailsMap/TouristicContent';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';
import { TouristicContentGeometry } from '../DetailsMap/DetailsMap';

interface TouristicContentGeometryNullable {
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry | null;
  pictogramUri: string;
  name: string;
}

export type PropsType = {
  touristicContentGeometry: TouristicContentGeometryNullable;
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  bbox: Bbox;
};

export const TouristicContentMap: React.FC<PropsType> = props => {
  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

  const mapConfig = getMapConfig();
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
        {props.touristicContentGeometry !== null && (
          <TouristicContent
            contents={[props.touristicContentGeometry as TouristicContentGeometry]}
          />
        )}
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <Credits className="absolute right-0 bottom-0 z-mapButton">{mapConfig.mapCredits}</Credits>
    </>
  );
};

export default TouristicContentMap;
