import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Header } from 'components/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
Container.displayName = 'Container';

export const PageContent = styled.main`
  flex-grow: 1;
`;
PageContent.displayName = 'PageContent';

export const Layout: FunctionComponent = props => {
  return (
    <Container>
      <Header title="home.title" logoPath="/logo.png" />
      <PageContent>{props.children}</PageContent>
    </Container>
  );
};
