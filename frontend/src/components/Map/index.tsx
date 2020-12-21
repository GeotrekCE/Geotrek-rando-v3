import dynamic from 'next/dynamic';
import { POIList } from 'domain/POI/POI';

const MapDynamicComponent = (props: { points?: POIList | null }) => {
  const Map = dynamic(() => import('./Map'), {
    // eslint-disable-next-line react/display-name
    loading: () => <p>Loading a map</p>,
    ssr: false,
  });
  return <Map {...props} />;
};

export default MapDynamicComponent;
