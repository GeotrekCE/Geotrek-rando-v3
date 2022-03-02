import { useEffect, useMemo, useRef, useState } from 'react';
import { Marker } from 'react-leaflet';
import { Icon, LatLngLiteral, Marker as LMarker } from 'leaflet';

export type Props = {
  onChange?: (latLng: LatLngLiteral) => void;
  position: LatLngLiteral;
  pictogram: Icon;
};
export const DraggableMarker: React.FC<Props> = ({ onChange, position, pictogram }) => {
  const [currentPosition, setPosition] = useState<LatLngLiteral>(position);

  useEffect(() => {
    setPosition(position);
  }, [position]);

  const markerRef = useRef<LMarker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker !== null) {
          const latLng = marker.getLatLng();
          setPosition(latLng);
          onChange?.(latLng);
        }
      },
    }),
    [],
  );

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      icon={pictogram}
      position={currentPosition}
      ref={markerRef}
      zIndexOffset={1000}
    />
  );
};
