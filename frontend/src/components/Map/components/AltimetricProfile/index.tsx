import React from 'react';
import '@raruto/leaflet-elevation';
import '@raruto/leaflet-elevation/dist/leaflet-elevation.min.css';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';

interface AltimetricProfileProps {
  trekGeoJSON: string;
}

export const AltimetricProfile: React.FC<AltimetricProfileProps> = ({ trekGeoJSON }) => {
  const map = useMap();
  const intl = useIntl();
  const language = useRouter().locale ?? getDefaultLanguage();

  // @ts-ignore
  const elevationControl = L.control.elevation({
    theme: 'lightblue-theme',
    collapsed: false,
    detached: true,
    elevationDiv: '#altimetric-profile',
    summary: 'inline',
    marker: 'position-marker',
    followMarker: false,
    legend: false,
  });
  elevationControl.addTo(map);

  const mylocale = {
    'Total Length: ': `${intl.formatMessage({ id: 'details.altimetricProfile.totalLength' })} : `,
    'Max Elevation: ': `${intl.formatMessage({ id: 'details.altimetricProfile.maxElevation' })} : `,
    'Min Elevation: ': `${intl.formatMessage({ id: 'details.altimetricProfile.minElevation' })} : `,
  };

  // @ts-ignore
  L.registerLocale(language, mylocale);
  // @ts-ignore
  L.setLocale(language);

  elevationControl.load(trekGeoJSON);

  return <div></div>;
};
