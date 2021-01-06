import React from 'react';
import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing, typography } from 'stylesheet';

import { flexGap } from 'services/cssHelpers';

import { Chip } from 'components/Chip';
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
      </DetailsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: ${getSpacing(4)} ${getSpacing(4)};

  border-radius: ${borderRadius.card};
  overflow: hidden;
`;

const ImageContainer = styled.div`
  height: ${getSpacing(31)};
  width: 100%;

  background-image: url('images/hiking-cover.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  position: relative;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${getSpacing(4)};

  border: 1px solid ${colorPalette.greySoft};
  border-top: none;
  border-radius: 0 0 ${borderRadius.card} ${borderRadius.card};
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
`;

const TagContainer = styled.div`
  display: flex;
  margin-top: ${getSpacing(2)};
`;

const TagLayout = styled.div`
  ${flexGap(getSpacing(2))}
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
