import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import { Header } from 'components/Header';
import { Router } from 'next/router';
import { colorPalette, zIndex } from 'stylesheet';
import Loader from 'react-loader';

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
  const [isRedirectionLoading, setIsRedirectionLoading] = useState(false);

  Router.events.on('routeChangeStart', () => setIsRedirectionLoading(true));
  Router.events.on('routeChangeError', () => setIsRedirectionLoading(false));
  Router.events.on('routeChangeComplete', () => setIsRedirectionLoading(false));

  return (
    <Container>
      <Header />
      <PageContent>
        <Loader
          loaded={!isRedirectionLoading}
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
