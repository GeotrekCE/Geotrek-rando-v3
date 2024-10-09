import getActivityColor from 'components/pages/search/components/ResultCard/getActivityColor';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';
import React, { ReactNode, useMemo } from 'react';
import { Marker } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { TrekChildMarker } from '../Markers/TrekChildMarker';
import { TrekMarker } from '../Markers/TrekMarker';

const ZOOM_RATIO = 1.5;

interface BaseProps {
  id: string;
  position: LatLngTuple;
  children?: ReactNode;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

interface TrekOrTouristicContentProps extends BaseProps {
  pictogramUri?: string;
  type?: string | null;
}

interface TrekChildProps extends BaseProps {
  rank: number;
  type?: 'TREK_CHILD';
}

const isTrekChild = (trek: TrekOrTouristicContentProps | TrekChildProps): trek is TrekChildProps =>
  trek.type === 'TREK_CHILD';

export const HoverableMarker: React.FC<TrekOrTouristicContentProps | TrekChildProps> = props => {
  const { hoveredCardId } = useListAndMapContext();
  const isCorrespondingCardHovered = props.id === hoveredCardId;
  const color = getActivityColor(props.type ?? null);

  return useMemo(
    () => (
      <Marker
        position={props.position}
        eventHandlers={{
          ...(props.onMouseOver && { mouseover: props.onMouseOver }),
          ...(props.onMouseOut && { mouseout: props.onMouseOut }),
        }}
        icon={
          isTrekChild(props)
            ? TrekChildMarker(props.rank, isCorrespondingCardHovered ? ZOOM_RATIO : 1, color)
            : TrekMarker(props.pictogramUri, isCorrespondingCardHovered ? ZOOM_RATIO : 1, color)
        }
      >
        {props.children}
      </Marker>
    ),
    [props.id, isCorrespondingCardHovered, color],
  );
};
