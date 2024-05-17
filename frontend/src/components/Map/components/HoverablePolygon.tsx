import getActivityColor from 'components/pages/search/components/ResultCard/getActivityColor';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';
import { useMemo } from 'react';
import { Polygon } from 'react-leaflet';

const ZOOMED_WEIGHT = 10;
const DEFAULT_WEIGHT = 3;

interface Props {
  id: string;
  positions: [number, number][][];
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT' | 'OUTDOOR_COURSE' | null;
}

export const HoverablePolygon: React.FC<Props> = props => {
  const { hoveredCardId } = useListAndMapContext();
  const isCorrespondingCardHovered = props.id === hoveredCardId;
  const color = getActivityColor(props.type);

  const weight = isCorrespondingCardHovered ? ZOOMED_WEIGHT : DEFAULT_WEIGHT;

  return useMemo(
    () => <Polygon key={props.id} positions={props.positions} color={color} weight={weight} />,
    [color, props.id, props.positions, weight],
  );
};
