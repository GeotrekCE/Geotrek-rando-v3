import getActivityColor from 'components/pages/search/components/ResultCard/getActivityColor';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';
import { useMemo } from 'react';
import { Polyline } from 'react-leaflet';

const ZOOMED_WEIGHT = 10;
const DEFAULT_WEIGHT = 3;

interface Props {
  id: string;
  positions: [number, number][];
  type: string | null;
}

export const HoverablePolyline: React.FC<Props> = props => {
  const { hoveredCardId } = useListAndMapContext();
  const isCorrespondingCardHovered = props.id === hoveredCardId;
  const color = getActivityColor(props.type);

  const weight = isCorrespondingCardHovered ? ZOOMED_WEIGHT : DEFAULT_WEIGHT;

  return useMemo(
    () => <Polyline key={props.id} positions={props.positions} color={color} weight={weight} />,
    [color, props.id, props.positions, weight],
  );
};
