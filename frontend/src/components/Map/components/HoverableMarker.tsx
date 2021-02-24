import { ListAndMapContext } from 'modules/map/ListAndMapContext';
import React, { useContext, useMemo } from 'react';
import { Marker } from 'react-leaflet';
import { TrekChildMarker } from '../Markers/TrekChildMarker';
import { TrekMarker } from '../Markers/TrekMarker';

const ZOOM_RATIO = 1.5;

interface BaseProps {
  id: string;
  position: [number, number];
}

interface TrekProps extends BaseProps {
  pictogramUri: string;
  type: 'TREK';
}

interface TrekChildProps extends BaseProps {
  rank: number;
  type: 'TREK_CHILD';
}

const isTrekChild = (trek: TrekProps | TrekChildProps): trek is TrekChildProps =>
  trek.type === 'TREK_CHILD';

export const HoverableMarker = (props: TrekProps | TrekChildProps) => {
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
      />
    ),
    [props.id, isCorrespondingCardHovered],
  );
};
