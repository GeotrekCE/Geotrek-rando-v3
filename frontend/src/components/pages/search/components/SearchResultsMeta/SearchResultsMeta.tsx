import Image from 'next/image';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { colorPalette, desktopOnly, typography } from 'stylesheet';

interface Props {
  resultsNumber: number | undefined;
}

export const SearchResultsMeta: React.FC<Props> = ({ resultsNumber }) => {
  return (
    <div className="flex items-center">
      <div>
        <Image
          loading="lazy"
          className="hidden desktop:block"
          src="/images/little-forest.svg"
          height={64}
          width={64}
          alt=""
        />
      </div>

      <div className="desktop:ml-6">
        <ResultsNumber>
          <FormattedMessage values={{ count: resultsNumber }} id="search.resultsFound" />
        </ResultsNumber>
      </div>
    </div>
  );
};

const ResultsNumber = styled.div`
  ${typography.h3};
  color: ${colorPalette.darkPurple};

  ${desktopOnly(css`
    ${typography.h2}
  `)}
`;
