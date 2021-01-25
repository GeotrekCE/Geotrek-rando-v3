import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Link } from 'components/Link';

interface Props {
  resultsNumber: number | undefined;
  /* These names are challengeable */
  placeName: string;
  placeUrl: string;
}

export const SearchResultsMeta: React.FC<Props> = ({ resultsNumber, placeName, placeUrl }) => {
  return (
    <div className="flex">
      <div>
        <img className="hidden desktop:block h-16 w-16" src="images/little-forest.png" />
      </div>

      <div className="desktop:ml-6">
        <div className="text-Mobile-H1 desktop:text-H2 font-bold">
          <FormattedMessage values={{ count: resultsNumber }} id="search.resultsFound" />
        </div>
        <div className="hidden desktop:inline">
          <FormattedMessage id="search.forThe" />
          <Link
            className="text-primary1 hover:text-primary3
            ml-1
            cursor-pointer transition-all duration-300"
            href={placeUrl}
          >
            {placeName}
          </Link>
        </div>
      </div>
    </div>
  );
};
