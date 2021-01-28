import dynamic from 'next/dynamic';
import { PropsType as MapProps } from './Map';

export const MapDynamicComponent: React.FC<MapProps> = props => {
  const Map = dynamic(() => import('./Map'), {
    ssr: false,
  });
  return <Map {...props} />;
};
