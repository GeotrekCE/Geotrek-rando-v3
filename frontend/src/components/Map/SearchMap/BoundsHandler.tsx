import { LatLngBounds } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
  bounds: LatLngBounds | null;
}

const BoundsHandler: React.FC<Props> = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};

export default BoundsHandler;
