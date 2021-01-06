import React from 'react';
import styled, { css } from 'styled-components';

import { borderRadius, colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';
import { flexGap } from 'services/cssHelpers';

import { Chip } from 'components/Chip';
import { Button } from 'components/Button';

import { Clock } from 'components/Icons/Clock';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { Walking } from 'components/Icons/Walking';

import { Information } from './Information';
import { ActivityBadge as RawActivityBadge } from './ActivityBadge';

export const ResultCard: React.FC = () => {
  return (
    <Container>
      <ImageContainer>
        <ActivityBadge icon={Walking} />
      </ImageContainer>
      <DetailsContainer>
        <DetailsLayout>
          <Place>Saint-Etienne-du-Valdonnez</Place>
          <Title>Balade au pays des menhirs</Title>
          <TagContainer>
            <TagLayout>
              <Chip>En famille</Chip>
              <Chip>Ciel étoilé</Chip>
              <Chip>En famille</Chip>
            </TagLayout>
          </TagContainer>
          <InformationContainer>
            <InformationLayout>
              <Information icon={Clock}>2h</Information>
              <Information icon={CodeBrackets}>5km</Information>
              <Information icon={TrendingUp}>+360m</Information>
            </InformationLayout>
          </InformationContainer>
        </DetailsLayout>
        <BookingButtonContainer>
          <Button>Réserver</Button>
        </BookingButtonContainer>
      </DetailsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: ${getSpacing(4)};

  border-radius: ${borderRadius.card};
  overflow: hidden;

  ${desktopOnly(
    css`
      flex-direction: row;
      margin: ${getSpacing(6)};
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
