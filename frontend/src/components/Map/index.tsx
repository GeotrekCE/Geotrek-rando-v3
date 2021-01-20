import dynamic from 'next/dynamic';
import { POIList } from 'domain/POI/POI';
import { TreksList } from 'domain/Trek/Trek';

export const MapDynamicComponent = (props: {
  points?: POIList | null;
  segments?: TreksList | null;
}) => {
  const Map = dynamic(() => import('./Map'), {
    // eslint-disable-next-line react/display-name
    loading: () => <p>Loading a map</p>,
    ssr: false,
  });
  return <Map {...props} />;
};
