import React from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';

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
        <Illustration className="hidden desktop:block" src="images/little-forest.png" />
      </div>

      <div className="desktop:ml-6">
        <ResultsNumber>
          <FormattedMessage values={{ count: resultsNumber }} id="search.resultsFound" />
        </ResultsNumber>
        <SearchInfo className="hidden desktop:inline">
          <FormattedMessage id="search.forThe" /> <Link href={placeUrl}>{placeName}</Link>
        </SearchInfo>
      </div>
    </div>
  );
};

const Illustration = styled.img`
  height: ${getSpacing(16)};
  width: ${getSpacing(16)};
`;

const ResultsNumber = styled.div`
  ${typography.h1};
  color: ${colorPalette.darkPurple};

  ${desktopOnly(css`
    ${typography.h2}
  `)}
`;

const SearchInfo = styled.span`
  ${typography.main};
`;
