import { useEffect } from 'react';
import L from 'leaflet';
import '@raruto/leaflet-elevation/src/index.js';
import '@raruto/leaflet-elevation/src/index.css';
import { useMap } from 'react-leaflet';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { FeatureCollection, LineString } from 'geojson';

interface AltimetricProfileProps {
  trekGeoJSON: string;
  id: string;
}

export const AltimetricProfile: React.FC<AltimetricProfileProps> = ({ trekGeoJSON, id }) => {
  const map = useMap();
  const intl = useIntl();
  const language = useRouter().locale ?? getDefaultLanguage();

  useEffect(() => {
    if (!map) {
      return;
    }

    const { features } = JSON.parse(trekGeoJSON) as FeatureCollection;
    const elevationValues = (features[0].geometry as LineString).coordinates.map(coord => coord[2]);
    const yAxisMin = Math.min(...elevationValues) * 0.75;
    const yAxisMax = Math.max(...elevationValues) * 1.25;

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
      zooming: false,
      yAxisMin,
      yAxisMax,
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

    return () => {
      elevationControl.clear();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      map.removeControl(elevationControl);
    };
  }, [id, intl, language, map, trekGeoJSON]);

  return null;
};
