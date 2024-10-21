import { memo } from 'react';
import dynamic from 'next/dynamic';
import ConditionallyRender from 'components/ConditionallyRender';
import { PropsType as SearchMapProps } from './SearchMap';
import { PropsType as DetailsMapProps } from './DetailsMap/DetailsMap';
import { PropsType as TouristicContentMapProps } from './TouristicContentMap/TouristicContentMap';

const SearchMapDynamicComponentWithoutMemo: React.FC<SearchMapProps> = props => {
  const SearchMap = dynamic(() => import('./SearchMap'), {
    ssr: false,
  });

  return (
    <ConditionallyRender client>
      <SearchMap {...props} />
    </ConditionallyRender>
  );
};

export const SearchMapDynamicComponent = memo(
  SearchMapDynamicComponentWithoutMemo,
  (oldProps, nextProps) => oldProps.hasZoomControl === nextProps.hasZoomControl,
);

const DetailsMapDynamicComponentWithoutMemo: React.FC<DetailsMapProps> = props => {
  const DetailsMap = dynamic(() => import('./DetailsMap/DetailsMap'), {
    ssr: false,
  });
  return (
    <ConditionallyRender client>
      <DetailsMap {...props} />
    </ConditionallyRender>
  );
};

export const DetailsMapDynamicComponent = memo(DetailsMapDynamicComponentWithoutMemo);

export const TouristicContentMapDynamicComponent: React.FC<TouristicContentMapProps> = props => {
  const TouristicContentMap = dynamic(() => import('./TouristicContentMap/TouristicContentMap'), {
    ssr: false,
  });
  return (
    <ConditionallyRender client>
      <TouristicContentMap {...props} />
    </ConditionallyRender>
  );
};
