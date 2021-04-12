import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  borderRadius,
  colorPalette,
  desktopOnly,
  getSpacing,
  shadow,
  sizes,
  typography,
} from 'stylesheet';
import { flexGap } from 'services/cssHelpers';

import { Chip } from 'components/Chip';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import { LocalIconInformation, RemoteIconInformation } from 'components/Information';
import { TouristicContentDetailsType } from 'modules/touristicContent/interface';

import { Clock } from 'components/Icons/Clock';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { ListAndMapContext } from 'modules/map/ListAndMapContext';

import { ActivityBadge as RawActivityBadge } from './ActivityBadge';
import { ResultCardCarousel } from './ResultCardCarousel';

interface BaseProps {
  id: string;
  hoverId: string;
  place: string | null;
  title: string;
  tags: string[];
  thumbnailUris: string[];
  badgeIconUri: string;
  className?: string;
  redirectionUrl: string;
}

interface TrekProps extends BaseProps {
  type: 'TREK';
  informations: {
    duration: string | null;
    distance: string;
    elevation: string;
    difficulty: { label: string; pictogramUri: string } | null;
    reservationSystem: number | null;
  };
}

interface TouristicContentProps extends BaseProps {
  type: 'TOURISTIC_CONTENT';
  informations: TouristicContentDetailsType[];
}

const isTrek = (content: TrekProps | TouristicContentProps): content is TrekProps =>
  content.type === 'TREK';

export const ResultCard: React.FC<TrekProps | TouristicContentProps> = props => {
  const {
    id,
    hoverId,
    place,
    title,
    tags,
    thumbnailUris,
    badgeIconUri,
    className,
    redirectionUrl,
  } = props;
  const { setHoveredCardId } = useContext(ListAndMapContext);
  return (
    <Container
      onMouseEnter={() => {
        setHoveredCardId(hoverId);
      }}
      onMouseLeave={() => {
        setHoveredCardId(null);
      }}
      className={className}
      id="result_card"
    >
      {thumbnailUris.length > 1 ? (
        <ResultCardCarousel thumbnailUris={thumbnailUris} iconUri={badgeIconUri} />
      ) : (
        <ImageContainer imageUri={thumbnailUris[0]}>
          <ActivityBadge iconUri={badgeIconUri} />
        </ImageContainer>
      )}

      <Link href={redirectionUrl} testId={`Link-ResultCard-${id}`} className="w-full">
        <DetailsContainer>
          <DetailsLayout>
            {place !== null && <Place>{place}</Place>}

            <Title>{title}</Title>

            <TagContainer>
              <TagLayout>
                {tags
                  .filter(tag => tag !== null && tag.length > 0)
                  .map(tag => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
              </TagLayout>
            </TagContainer>
            {isTrek(props) ? (
              <InformationContainer>
                <InformationLayout>
                  {props.informations.difficulty !== null && (
                    <RemoteIconInformation iconUri={props.informations.difficulty.pictogramUri}>
                      {props.informations.difficulty.label}
                    </RemoteIconInformation>
                  )}
                  {props.informations.duration !== null && (
                    <LocalIconInformation icon={Clock}>
                      {props.informations.duration}
                    </LocalIconInformation>
                  )}
                  <LocalIconInformation icon={CodeBrackets}>
                    {props.informations.distance}
                  </LocalIconInformation>
                  <LocalIconInformation icon={TrendingUp} className="desktop:flex hidden">
                    {props.informations.elevation}
                  </LocalIconInformation>
                </InformationLayout>
              </InformationContainer>
            ) : (
              <InformationContainer>
                {props.informations.map(
                  ({ label, values }) =>
                    values.length > 0 && (
                      <div key={label} className="text-greyDarkColored">
                        <span className="font-bold">{`${label} : `}</span>
                        {values.map(value => (
                          <span key={value}>{value}</span>
                        ))}
                      </div>
                    ),
                )}
              </InformationContainer>
            )}
          </DetailsLayout>
          {isTrek(props) && props.informations.reservationSystem !== null && (
            <BookingButtonContainer>
              <Button>
                <FormattedMessage id="search.book" />
              </Button>
            </BookingButtonContainer>
          )}
        </DetailsContainer>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    box-shadow: ${shadow.small};
  }
  border-radius: ${borderRadius.card};
  border: 1px solid ${colorPalette.greySoft.DEFAULT};
  overflow: hidden;
  // Fix for overflow hidden with border radius in Safari, see https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: radial-gradient(white, black);

  align-items: stretch;

  ${desktopOnly(
    css`
      flex-direction: row;
    `,
  )}
`;

const ImageContainer = styled.div<{ imageUri: string }>`
  height: ${sizes.resultCardMobile};
  width: 100%;

  background-image: url(${({ imageUri }) => imageUri});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: black;

  position: relative;

  ${desktopOnly(
    css`
      height: auto;
      max-width: ${sizes.resultCardDesktop}px;
    `,
  )}
`;

const DetailsContainer = styled.div`
  display: flex;
  width: 100%;

  padding: ${getSpacing(4)};

  ${desktopOnly(
    css`
      padding: ${getSpacing(6)};
    `,
  )}
`;

const DetailsLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BookingButtonContainer = styled.div`
  margin-left: ${getSpacing(4)};
  display: none;

  ${desktopOnly(
    css`
      display: block;
    `,
  )}
`;

const Place = styled.span`
  color: ${colorPalette.greyDarkColored};
  ${typography.small}
`;

const Title = styled.span`
  margin-top: ${getSpacing(1)};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${typography.h3}
  color: ${colorPalette.primary1};

  ${desktopOnly(
    css`
      text-overflow: clip;
      white-space: normal;
    `,
  )}
`;

const TagContainer = styled.div`
  display: flex;
  margin-top: ${getSpacing(2)};

  ${desktopOnly(
    css`
      margin-top: ${getSpacing(4)};
    `,
  )}
`;

const TagLayout = styled.div`
  ${flexGap(getSpacing(2))}

  ${desktopOnly(
    css`
      ${flexGap(getSpacing(4))}
    `,
  )}
`;

const InformationContainer = styled.div`
  margin-top: ${getSpacing(4)};
`;

const InformationLayout = styled.div`
  ${flexGap(getSpacing(2))}
  ${desktopOnly(
    css`
      ${flexGap(getSpacing(4))}
    `,
  )}
`;

const ActivityBadge = styled(RawActivityBadge)`
  position: absolute;
  top: ${getSpacing(4)};
  left: ${getSpacing(4)};
`;
