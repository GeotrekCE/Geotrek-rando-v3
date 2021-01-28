import dynamic from 'next/dynamic';
import { TreksList } from 'domain/Trek/Trek';
import { MapResults } from 'modules/mapResults/interface';

export const MapDynamicComponent = (props: {
  points?: MapResults;
  segments?: TreksList | null;
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  openFilterMenu?: () => void;
  hasFilters?: boolean;
  arrivalLocation?: { x: number; y: number };
  departureLocation?: { x: number; y: number };
}) => {
  const Map = dynamic(() => import('./Map'), {
    ssr: false,
  });
  return <Map {...props} />;
};
