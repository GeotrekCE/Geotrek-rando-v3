import { ClusterContainer } from 'components/Map/components/ClusterContainer';
import { DecoratedPolyline } from 'components/Map/components/DecoratedPolyline';
import { HoverableMarker } from 'components/Map/components/HoverableMarker';
import { Popup } from 'components/Map/components/Popup';
import { TrekCourse } from 'components/Map/components/TrekCourse';
import { useSelectedMarker } from 'components/Map/hooks/useSelectedMarker';
import { ArrivalMarker } from 'components/Map/Markers/ArrivalMarker';
import { DepartureMarker } from 'components/Map/Markers/DepartureMarker';
import { ParkingMarker } from 'components/Map/Markers/ParkingMarker';
import { getHoverId } from 'components/pages/search/utils';
import React, { useContext } from 'react';
import { Marker } from 'react-leaflet';
import { ListAndMapContext } from '../../../modules/map/ListAndMapContext';

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
};

const SearchMapChildrens: React.FC<PropsType> = props => {
  const {
    selectedMarkerType,
    selectedMarkerId,
    setSelectedMarkerId,
    setSelectedMarkerType,
    resetSelectedMarker,
  } = useSelectedMarker();

  const { hoveredCardId, points } = useContext(ListAndMapContext);
  const hoveredPoint = points?.find(point => getHoverId(point) === hoveredCardId);

  return (
    <>
      <ClusterContainer enabled={props.shouldUseClusters ?? false}>
        {points.map(
          (point, i) =>
            point.location !== null && (
              <HoverableMarker
                key={i}
                id={getHoverId(point)}
                type={point.type}
                position={[point.location.y, point.location.x]}
                pictogramUri={point.practice?.pictogram}
                onMouseOver={() => {
                  setSelectedMarkerId(point.id);
                  setSelectedMarkerType(point.type);
                }}
                onMouseOut={() => {
                  resetSelectedMarker();
                }}
              >
                {(props.shouldUsePopups ?? false) && (
                  <Popup
                    id={point.id}
                    handleOpen={() => {
                      setSelectedMarkerId(point.id);
                      setSelectedMarkerType(point.type);
                    }}
                    handleClose={resetSelectedMarker}
                    type={point.type}
                  />
                )}
              </HoverableMarker>
            ),
        )}
        {props.arrivalLocation !== undefined && (
          <Marker
            position={[props.arrivalLocation.y, props.arrivalLocation.x]}
            icon={ArrivalMarker}
          />
        )}
        {props.departureLocation !== undefined && (
          <Marker
            position={[props.departureLocation.y, props.departureLocation.x]}
            icon={DepartureMarker}
          />
        )}
        {props.parkingLocation !== undefined && (
          <Marker
            position={[props.parkingLocation.y, props.parkingLocation.x]}
            icon={ParkingMarker}
          />
        )}
      </ClusterContainer>
      {hoveredPoint && hoveredCardId && hoveredPoint.location !== null && (
        <HoverableMarker
          id={hoveredCardId}
          type={hoveredPoint.type}
          position={[hoveredPoint.location.y, hoveredPoint.location.x]}
          pictogramUri={hoveredPoint.practice?.pictogram}
        />
      )}
      {props.segments && <DecoratedPolyline positions={props.segments} />}
      {selectedMarkerId && selectedMarkerType && (
        <TrekCourse id={selectedMarkerId} type={selectedMarkerType} />
      )}
      {hoveredPoint && <TrekCourse id={hoveredPoint.id} type={hoveredPoint.type} />}
    </>
  );
};

export default SearchMapChildrens;
