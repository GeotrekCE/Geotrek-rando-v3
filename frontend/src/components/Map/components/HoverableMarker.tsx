import { ListAndMapContext } from 'modules/map/ListAndMapContext';
import React, { ReactNode, useContext, useMemo } from 'react';
import { Marker } from 'react-leaflet';
import { TrekChildMarker } from '../Markers/TrekChildMarker';
import { TrekMarker } from '../Markers/TrekMarker';

const ZOOM_RATIO = 1.5;

interface BaseProps {
  id: string;
  position: [number, number];
  children?: ReactNode;
}

interface TrekOrTouristicContentProps extends BaseProps {
  pictogramUri?: string;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT';
}

interface TrekChildProps extends BaseProps {
  rank: number;
  type: 'TREK_CHILD';
}

const isTrekChild = (trek: TrekOrTouristicContentProps | TrekChildProps): trek is TrekChildProps =>
  trek.type === 'TREK_CHILD';

export const HoverableMarker = (props: TrekOrTouristicContentProps | TrekChildProps) => {
  const { hoveredCardId } = useContext(ListAndMapContext);
  const isCorrespondingCardHovered = props.id === hoveredCardId;
  return useMemo(
    () => (
      <Marker
        key={props.id}
        position={props.position}
        icon={
          isTrekChild(props)
            ? TrekChildMarker(props.rank, isCorrespondingCardHovered ? ZOOM_RATIO : 1)
            : TrekMarker(props.pictogramUri, isCorrespondingCardHovered ? ZOOM_RATIO : 1)
        }
      >
        {props.children}
      </Marker>
    ),
    [props.id, isCorrespondingCardHovered],
  );
};
