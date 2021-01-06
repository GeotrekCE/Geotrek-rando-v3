import React from 'react';
import styled from 'styled-components';

import { borderRadius, colorPalette, getSpacing, typography } from 'stylesheet';

export const ResultCard: React.FC = () => {
  return (
    <Container>
      <ImageContainer></ImageContainer>
      <DetailsContainer>
        <Place>Saint-Etienne-du-Valdonnez</Place>
        <Title>Balade au pays des menhirs</Title>
        <TagContainer></TagContainer>
        <InformationContainer></InformationContainer>
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

const TagContainer = styled.div``;

const InformationContainer = styled.div``;
