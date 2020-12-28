import { FunctionComponent } from 'react';
import Link from 'next/link';

import { routes } from 'services/routes';

import { HeaderContainer, Logo, Title } from './Header.style';

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
