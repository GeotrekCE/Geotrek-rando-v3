import { useContext } from 'react';
import { textEllipsisAfterNLines } from 'services/cssHelpers';
import parse from 'html-react-parser';
import { HtmlText } from 'components/pages/details/utils';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'components/Link';
import { ListAndMapContext } from 'modules/map/ListAndMapContext';
import { CardIcon } from 'components/CardIcon';
import { getSpacing, MAX_WIDTH_MOBILE } from 'stylesheet';
import { useDetailsCard } from './useDetailsCard';
import { DetailsCardCarousel } from '../DetailsCardCarousel';
export interface DetailsCardProps {
  id: string;
  name: string;
  place?: string;
  description?: string;
  thumbnailUris: string[];
  iconUri?: string;
  logoUri?: string;
  className?: string;
  redirectionUrl?: string;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  id,
  name,
  description,
  thumbnailUris,
  iconUri,
  place,
  logoUri,
  className,
  redirectionUrl,
}) => {
  const { truncateState, toggleTruncateState, heightState, detailsCardRef } = useDetailsCard();
  const descriptionStyled =
    truncateState === 'TRUNCATE' ? (
      <TruncatedHtmlText className="text-greyDarkColored">
        {parse(description ?? '')}
      </TruncatedHtmlText>
    ) : (
      <HtmlText className="text-greyDarkColored">{parse(description ?? '')}</HtmlText>
    );

  const { setHoveredCardId } = useContext(ListAndMapContext);

  return (
    <DetailsCardContainer
      height={heightState}
      className={`border border-solid border-greySoft rounded-card
      flex-none overflow-hidden relative
      flex flex-col h-auto desktop:flex-row desktop:w-auto mx-1
      cursor-pointer hover:border-blackSemiTransparent transition-all duration-500
      ${className ?? ''}`}
      onMouseEnter={() => {
        setHoveredCardId(id);
      }}
      onMouseLeave={() => {
        setHoveredCardId(null);
      }}
    >
      {logoUri && (
        <img
          className="hidden desktop:absolute h-12 object-cover object-center right-6 top-6"
          src={logoUri}
        />
      )}
      <div className="flex-none desktop:w-2/5">
        {thumbnailUris.length > 1 ? (
          <DetailsCardCarousel thumbnailUris={thumbnailUris} height={heightState} />
        ) : (
          <CardSingleImage src={thumbnailUris[0]} height={heightState} />
        )}
        {iconUri && <CardIcon iconUri={iconUri} />}
      </div>
      <div
        ref={detailsCardRef}
        className={`flex flex-col relative
        p-2 desktop:p-6 desktop:my-auto`}
      >
        {place && (
          <OptionalLink redirectionUrl={redirectionUrl}>
            <p className="text-greyDarkColored">{place}</p>
          </OptionalLink>
        )}
        <OptionalLink redirectionUrl={redirectionUrl}>
          <p className="text-Mobile-C1 desktop:text-H4 text-primary1 font-bold">{name}</p>
        </OptionalLink>
        {description && (
          <div
            className="mt-1 desktop:mt-4
            flex flex-col desktop:flex-row desktop:items-end
            text-Mobile-C2 desktop:text-P1 text-greyDarkColored"
          >
            <OptionalLink redirectionUrl={redirectionUrl}>{descriptionStyled}</OptionalLink>
            <span
              className="text-primary1 underline cursor-pointer flex-shrink-0 desktop:ml-1"
              onClick={toggleTruncateState}
            >
              <FormattedMessage
                id={truncateState === 'TRUNCATE' ? 'details.readMore' : 'details.readLess'}
              />
            </span>
          </div>
        )}
      </div>
    </DetailsCardContainer>
  );
};

interface OptionalLinkProps {
  redirectionUrl?: string;
  children: React.ReactNode;
}

const OptionalLink: React.FC<OptionalLinkProps> = ({ redirectionUrl, children }) => {
  return redirectionUrl !== undefined ? (
    <Link href={redirectionUrl}>{children}</Link>
  ) : (
    <>{children}</>
  );
};

const DetailsCardContainer = styled.div<{ height: number }>`
  height: fit-content;
  flex: none;
  overflow: hidden;
  display: flex;
  // Fix for border radius + overflow hidden in Safari, see https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: radial-gradient(white, black);
  position: relative;
  flex-direction: column;
  @media (min-width: ${MAX_WIDTH_MOBILE}px) {
    height: ${props => props.height}px;
    width: auto;
    flex-direction: row;
    margin-bottom: ${getSpacing(6)};
  }
`;

export const CardSingleImage = styled.img<{ height: number }>`
  height: ${getSpacing(50)};
  width: ${getSpacing(60)};
  object-fit: cover;
  object-position: top;
  @media (min-width: ${MAX_WIDTH_MOBILE}px) {
    height: ${props => props.height}px;
    width: 100%;
  }
`;

const TruncatedHtmlText = styled(HtmlText)`
  ${textEllipsisAfterNLines(2)}
`;
