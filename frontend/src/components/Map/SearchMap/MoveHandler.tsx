import { LatLngBounds } from 'leaflet';
import { useCallback, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import debounce from 'debounce';

interface Props {
  onMove: (bounds: LatLngBounds) => void;
}

const MoveHandler: React.FC<Props> = ({ onMove }) => {
  const map = useMap();

  const handleMove = useCallback(
    debounce(
      () => {
        onMove(map.getBounds());
      },
      1000,
      false,
    ),
    [map, onMove],
  );

  useEffect(() => {
    map.on('moveend', handleMove);
    return () => {
      map.off('moveend', handleMove);
    };
  }, [handleMove, map]);

  return null;
};

export default MoveHandler;
