import React from 'react';
import styled from 'styled-components';
import { colorPalette, getSpacing, typography } from 'stylesheet';

export const SearchResultsMeta: React.FC = () => {
  return (
    <div className="flex-initial flex-col">
      <ResultsNumber>82 résultats trouvés</ResultsNumber>
      <RankingInfo>Classement par ordre de pertinence</RankingInfo>
    </div>
  );
};

const ResultsNumber = styled.div`
  ${typography.h1};
  color: ${colorPalette.darkPurple};
`;

const RankingInfo = styled.div`
  ${typography.small}
  margin-top: ${getSpacing(1)};
`;
