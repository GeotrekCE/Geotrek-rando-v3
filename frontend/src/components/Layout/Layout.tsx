import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Header } from 'components/Header';
import { borderRadius, colorPalette, getSpacing } from 'stylesheet';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 ${getSpacing(26)};
`;
Container.displayName = 'Container';

export const PageContent = styled.main`
  background-color: ${colorPalette.blueLight};
  border-radius: ${borderRadius.large};
  padding: ${getSpacing(6)};
  flex-grow: 1;
`;
PageContent.displayName = 'PageContent';

export const Layout: FunctionComponent = props => {
  return (
    <Container>
      <Header />
      <PageContent>{props.children}</PageContent>
    </Container>
  );
};
