import React from 'react';
import styled, { css } from 'styled-components';

import { borderRadius, colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';
import { flexGap } from 'services/cssHelpers';

import { Chip } from 'components/Chip';
import { Button } from 'components/Button';

import { Clock } from 'components/Icons/Clock';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { TrendingUp } from 'components/Icons/TrendingUp';

import { FormattedMessage } from 'react-intl';
import { LocalIconInformation, RemoteIconInformation } from './Information';
import { ActivityBadge as RawActivityBadge } from './ActivityBadge';

interface Props {
  place: string;
  title: string;
  tags: string[];
  thumbnailUri: string;
  badgeIconUri: string;
  informations: {
    duration: string | null;
    distance: string;
    elevation: string;
    difficulty: { label: string; pictogramUri: string } | null;
    reservationSystem: number | null;
  };
}

export const ResultCard: React.FC<Props> = ({
  place,
  title,
  tags,
  thumbnailUri,
  badgeIconUri,
  informations,
}) => {
  return (
    <Container>
      <ImageContainer imageUri={thumbnailUri}>
        <ActivityBadge iconUri={badgeIconUri} />
      </ImageContainer>

      <DetailsContainer>
        <DetailsLayout>
          <Place>{place}</Place>

          <Title>{title}</Title>

          <TagContainer>
            <TagLayout>
              {tags.map(tag => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </TagLayout>
          </TagContainer>

          <InformationContainer>
            <InformationLayout>
              {informations.difficulty !== null && (
                <RemoteIconInformation iconUri={informations.difficulty.pictogramUri}>
                  {informations.difficulty.label}
                </RemoteIconInformation>
              )}
              {informations.duration !== null && (
                <LocalIconInformation icon={Clock}>{informations.duration}</LocalIconInformation>
              )}
              <LocalIconInformation icon={CodeBrackets}>
                {informations.distance}
              </LocalIconInformation>
              <LocalIconInformation icon={TrendingUp} className="desktop:flex hidden">
                {informations.elevation}
              </LocalIconInformation>
            </InformationLayout>
          </InformationContainer>
        </DetailsLayout>

        {informations.reservationSystem !== null && (
          <BookingButtonContainer>
            <Button>
              <FormattedMessage id="search.book" />
            </Button>
          </BookingButtonContainer>
        )}
      </DetailsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: ${getSpacing(4)} 0;

  border-radius: ${borderRadius.card};
  overflow: hidden;

  ${desktopOnly(
    css`
      // TODO Replace by 100% when we put the map on Search page
      width: 50%;
      flex-direction: row;
      margin: ${getSpacing(6)} 0;
    `,
  )}
`;

const ImageContainer = styled.div<{ imageUri: string }>`
  height: ${getSpacing(31)};
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
      max-width: ${getSpacing(56)};
    `,
  )}
`;

const DetailsContainer = styled.div`
  display: flex;
  width: 100%;

  padding: ${getSpacing(4)};

  border: 1px solid ${colorPalette.greySoft};
  border-top: none;
  border-radius: 0 0 ${borderRadius.card} ${borderRadius.card};

  ${desktopOnly(
    css`
      padding: ${getSpacing(6)};

      border: 1px solid ${colorPalette.greySoft};
      border-left: none;
      border-radius: 0 ${borderRadius.card} ${borderRadius.card} 0;
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
  ${typography.small}
`;

const Title = styled.span`
  margin-top: ${getSpacing(1)};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${typography.h1}
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

  /* To have a consistent height when there are no tags */
  min-height: 29px;

  ${desktopOnly(
    css`
      margin-top: ${getSpacing(4)};
      min-height: 26px;
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
  ${flexGap(getSpacing(4))}
`;

const ActivityBadge = styled(RawActivityBadge)`
  position: absolute;
  top: ${getSpacing(4)};
  left: ${getSpacing(4)};
`;
