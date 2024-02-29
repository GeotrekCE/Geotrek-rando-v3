import React, { useEffect } from 'react';
import '@raruto/leaflet-elevation';
import '@raruto/leaflet-elevation/dist/leaflet-elevation.min.css';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import useHasMounted from 'hooks/useHasMounted';

interface AltimetricProfileProps {
  trekGeoJSON: string;
  id: string;
}

export const AltimetricProfile: React.FC<AltimetricProfileProps> = ({ trekGeoJSON, id }) => {
  const map = useMap();
  const intl = useIntl();
  const language = useRouter().locale ?? getDefaultLanguage();
  const isMounted = useHasMounted();

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    const div = document.getElementById(id);
    if (div) div.innerHTML = '';

    // @ts-expect-error the lib is not typed
    const elevationControl = L.control.elevation({
      theme: 'lightblue-theme',
      collapsed: false,
      detached: true,
      elevationDiv: `#${id}`,
      summary: 'inline',
      marker: 'position-marker',
      followMarker: false,
      legend: false,
    });
    elevationControl.addTo(map);

    const mylocale = {
      'Total Length: ': `${intl.formatMessage({ id: 'details.altimetricProfileTotalLength' })} : `,
      'Max Elevation: ': `${intl.formatMessage({
        id: 'details.altimetricProfileMaxElevation',
      })} : `,
      'Min Elevation: ': `${intl.formatMessage({
        id: 'details.altimetricProfileMinElevation',
      })} : `,
    };

    // @ts-expect-error the lib is not typed
    L.registerLocale(language, mylocale);
    // @ts-expect-error the lib is not typed
    L.setLocale(language);

    elevationControl.load(trekGeoJSON);
  }, [id, intl, isMounted, language, map, trekGeoJSON]);

  return null;
};
