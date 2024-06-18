import { LatLngBounds } from 'leaflet';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import debounce from 'debounce';

interface Props {
  onMove: (bounds: LatLngBounds) => void;
}

const MoveHandler: React.FC<Props> = ({ onMove }) => {
  const map = useMap();

  const handleMove = useMemo(
    () =>
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
