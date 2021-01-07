import React from 'react';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';

export const SearchResultsMeta: React.FC = () => {
  return (
    <div className="flex">
      <div>
        <Illustration className="hidden desktop:block" src="images/little-forest.png" />
      </div>

      <div className="desktop:ml-6">
        <ResultsNumber>82 résultats trouvés</ResultsNumber>
        <RankingInfo className="desktop:hidden">Classement par ordre de pertinence</RankingInfo>
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

const RankingInfo = styled.div`
  ${typography.small}
  margin-top: ${getSpacing(1)};
`;
