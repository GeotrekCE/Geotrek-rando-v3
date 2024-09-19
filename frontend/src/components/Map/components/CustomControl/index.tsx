import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L, { ControlPosition } from 'leaflet';
import ReactDOM from 'react-dom';

export interface CustomControlProps {
  children: React.ReactNode;
  position?: ControlPosition;
  name?: string;
}

const CustomControl: React.FC<CustomControlProps> = ({
  position = 'bottomright',
  name = 'custom',
  children,
}) => {
  const map = useMap();
  const [controlContainer, setControlContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) {
      return;
    }
    const CustomLeafletControl = L.Control.extend({
      onAdd: () => {
        const container = L.DomUtil.create('div', `leaflet-control-${name}`);
        setControlContainer(container);
        return container;
      },
    });

    const customControl = new CustomLeafletControl({ position });
    customControl.addTo(map);

    return () => {
      map.removeControl(customControl);
    };
  }, [map, name, position]);

  // We put custom control always in first position
  useEffect(() => {
    if (controlContainer && controlContainer.parentNode) {
      const parentNode = controlContainer.parentNode;
      parentNode.insertBefore(controlContainer, parentNode.firstChild);
    }
  }, [controlContainer]);

  return controlContainer ? ReactDOM.createPortal(children, controlContainer) : null;
};

export default CustomControl;
