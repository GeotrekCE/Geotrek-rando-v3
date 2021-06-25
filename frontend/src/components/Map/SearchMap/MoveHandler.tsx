import { LatLngBounds } from 'leaflet';
import { useCallback, useEffect } from 'react';
import { useMap } from 'react-leaflet';
// @ts-ignore
import debounce from 'debounce';

interface Props {
  onMove: (bounds: LatLngBounds) => void;
}

const MoveHandler: React.FC<Props> = ({ onMove }) => {
  const map = useMap();

  useEffect(() => {
    map.on('moveend', handleMove);
  }, [map]);

  const handleMove = useCallback(
    debounce(
      () => {
        onMove(map.getBounds());
      },
      1000,
      false,
    ),
    [],
  );

  return null;
};

export default MoveHandler;
