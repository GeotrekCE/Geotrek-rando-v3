import dynamic from 'next/dynamic';
import { PropsType as SearchMapProps } from './SearchMap';
import { PropsType as DetailsMapProps } from './DetailsMap';

export const SearchMapDynamicComponent: React.FC<SearchMapProps> = props => {
  const SearchMap = dynamic(() => import('./SearchMap'), {
    ssr: false,
  });
  return <SearchMap {...props} />;
};

export const DetailsMapDynamicComponent: React.FC<DetailsMapProps> = props => {
  const DetailsMap = dynamic(() => import('./DetailsMap'), {
    ssr: false,
  });
  return <DetailsMap {...props} />;
};
