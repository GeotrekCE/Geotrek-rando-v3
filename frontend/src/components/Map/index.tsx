import dynamic from 'next/dynamic';
import { POIList } from 'domain/POI/POI';
import { TreksList } from 'domain/Trek/Trek';

export const MapDynamicComponent = (props: {
  points?: POIList | null;
  segments?: TreksList | null;
}) => {
  const Map = dynamic(() => import('./Map'), {
    ssr: false,
  });
  return <Map {...props} />;
};
