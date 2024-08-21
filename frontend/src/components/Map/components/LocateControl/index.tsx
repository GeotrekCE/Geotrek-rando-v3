import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useIntl } from 'react-intl';

import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import L from 'leaflet';

const LocateControl = ({ position = 'bottomright' }) => {
  const map = useMap();
  const intl = useIntl();

  useEffect(() => {
    if (!map) {
      return;
    }

    // @ts-expect-error no type available in this plugin
    const locateControl = L.control.locate({
      locateOptions: {
        enableHighAccuracy: true,
      },
      icon: 'gg-track',
      strings: {
        title: intl.formatMessage({ id: 'search.map.seeMe' }),
      },
      position,
    });

    locateControl.addTo(map);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      map.removeControl(locateControl);
    };
  }, [intl, map, position]);

  return null;
};

export default LocateControl;
