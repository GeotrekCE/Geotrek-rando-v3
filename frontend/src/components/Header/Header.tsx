import { FunctionComponent } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { oldGetSpacing, typography, zIndex } from 'stylesheet';

import { routes } from 'services/routes';

export const Header: FunctionComponent = () => {
  return (
    <HeaderContainer>
      <Link href={routes.HOME}>
        <Logo alt="logo" src="/logo.png" />
      </Link>
      <Title>Geotrek Rando</Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  ${typography.h1}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${oldGetSpacing(13)};
  padding: ${oldGetSpacing(10)} ${oldGetSpacing(4)};

  /* Replace background-color later */
  background-color: grey;
  position: sticky;
  top: 0;
  z-index: ${zIndex.header};
`;

HeaderContainer.displayName = 'HeaderContainer';

const Title = styled.h1`
  ${typography.h1}
`;
Title.displayName = 'HeaderTitle';

const Logo = styled.img`
  height: ${oldGetSpacing(9)};
`;

Logo.displayName = 'Logo';
