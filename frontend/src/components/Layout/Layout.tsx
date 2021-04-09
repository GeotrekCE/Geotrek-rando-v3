import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Header } from 'components/Header';
import { colorPalette, zIndex } from 'stylesheet';
import Loader from 'react-loader';
import { useNavigationLoader } from './useRedirection';

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
  const { isNavigationLoading } = useNavigationLoader();

  return (
    <Container>
      <Header />
      <PageContent>
        <Loader
          loaded={!isNavigationLoading}
          options={{
            color: colorPalette.primary1,
            zIndex: zIndex.loader,
          }}
        >
          {props.children}
        </Loader>
      </PageContent>
    </Container>
  );
};
