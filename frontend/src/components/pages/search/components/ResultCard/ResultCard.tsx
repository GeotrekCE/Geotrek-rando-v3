import React from 'react';
import styled, { css } from 'styled-components';

import { borderRadius, colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';
import { flexGap } from 'services/cssHelpers';

import { Chip } from 'components/Chip';
import { Button } from 'components/Button';

import { GenericIconProps } from 'components/Icons/types';
import { Clock } from 'components/Icons/Clock';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { Square } from 'components/Icons/Square';

import { FormattedMessage } from 'react-intl';
import { Information } from './Information';
import { ActivityBadge as RawActivityBadge } from './ActivityBadge';

interface Props {
  activityIcon: React.FC<GenericIconProps>;
  place: string;
  title: string;
  tags: string[];
  informations: {
    duration: string;
    distance: string;
    elevation: string;
    difficulty: string;
  };
}

export const ResultCard: React.FC<Props> = ({ activityIcon, place, title, tags, informations }) => {
  return (
    <Container>
      <ImageContainer>
        <ActivityBadge icon={activityIcon} />
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
              <Information icon={Clock}>{informations.duration}</Information>
              <Information icon={CodeBrackets}>{informations.distance}</Information>
              <Information icon={TrendingUp} className="desktop:flex hidden">
                {informations.elevation}
              </Information>
              <DifficultyInformation icon={Square}>{informations.difficulty}</DifficultyInformation>
            </InformationLayout>
          </InformationContainer>
        </DetailsLayout>

        <BookingButtonContainer>
          <Button>
            <FormattedMessage id="search.book" />
          </Button>
        </BookingButtonContainer>
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
      flex-direction: row;
      margin: ${getSpacing(6)} 0;
    `,
  )}
`;

const ImageContainer = styled.div`
  height: ${getSpacing(31)};
  width: 100%;

  background-image: url('images/hiking-cover.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  position: relative;

  ${desktopOnly(
    css`
      height: auto;
      max-width: ${getSpacing(56)};
      flex-shrink: 0;
    `,
  )}
`;

const DetailsContainer = styled.div`
  display: flex;

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
  ${flexGap(getSpacing(4))}
`;

const ActivityBadge = styled(RawActivityBadge)`
  position: absolute;
  top: ${getSpacing(4)};
  left: ${getSpacing(4)};
`;

const DifficultyInformation = styled(Information)`
  color: ${colorPalette.easyOK};
`;
