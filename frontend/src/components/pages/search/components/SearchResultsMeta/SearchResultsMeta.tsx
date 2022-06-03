import React from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';

interface Props {
  resultsNumber: number | undefined;
}

export const SearchResultsMeta: React.FC<Props> = ({ resultsNumber }) => {
  return (
    <div className="flex">
      <div>
        <Illustration className="hidden desktop:block" src="/images/little-forest.png" />
      </div>

      <div className="desktop:ml-6">
        <ResultsNumber>
          <FormattedMessage values={{ count: resultsNumber }} id="search.resultsFound" />
        </ResultsNumber>
      </div>
    </div>
  );
};

const Illustration = styled.img`
  height: ${getSpacing(16)};
  width: ${getSpacing(16)};
`;

const ResultsNumber = styled.div`
  ${typography.h3};
  color: ${colorPalette.darkPurple};

  ${desktopOnly(css`
    ${typography.h2}
  `)}
`;
