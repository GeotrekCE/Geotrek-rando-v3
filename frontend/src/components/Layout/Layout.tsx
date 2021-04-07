import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Header } from 'components/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
Container.displayName = 'Container';

export const PageContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
