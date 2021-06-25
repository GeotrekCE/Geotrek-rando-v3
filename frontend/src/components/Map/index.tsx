import { memo } from 'react';
import dynamic from 'next/dynamic';
import { PropsType as SearchMapProps } from './SearchMap';
import { PropsType as DetailsMapProps } from './DetailsMap/DetailsMap';
import { PropsType as TouristicContentMapProps } from './TouristicContentMap/TouristicContentMap';

const SearchMapDynamicComponentWithoutMemo: React.FC<SearchMapProps> = props => {
  const SearchMap = dynamic(() => import('./SearchMap'), {
    ssr: false,
  });

  return <SearchMap {...props} />;
};

export const SearchMapDynamicComponent = memo(SearchMapDynamicComponentWithoutMemo, () => true);

const DetailsMapDynamicComponentWithoutMemo: React.FC<DetailsMapProps> = props => {
  const DetailsMap = dynamic(() => import('./DetailsMap/DetailsMap'), {
    ssr: false,
  });
  return <DetailsMap {...props} />;
};

export const DetailsMapDynamicComponent = memo(DetailsMapDynamicComponentWithoutMemo);

export const TouristicContentMapDynamicComponent: React.FC<TouristicContentMapProps> = props => {
  const TouristicContentMap = dynamic(() => import('./TouristicContentMap/TouristicContentMap'), {
    ssr: false,
  });
  return <TouristicContentMap {...props} />;
};
