import dynamic from 'next/dynamic';
import { TreksList } from 'domain/Trek/Trek';
import { MapResults } from 'modules/mapResults/interface';

export const MapDynamicComponent = (props: {
  points?: MapResults;
  segments?: TreksList | null;
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
}) => {
  const Map = dynamic(() => import('./Map'), {
    ssr: false,
  });
  return <Map {...props} />;
};
