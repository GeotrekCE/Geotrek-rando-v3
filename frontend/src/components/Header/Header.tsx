import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import styled from 'styled-components';
import { colorPalette, getSpacing, typography, zIndex } from 'stylesheet';
import { routes } from 'services/routes';
import { BurgerMenu } from '../Icons/BurgerMenu';

interface Props {
  logoPath: string;
  title: string;
}

export const Header: React.FC<Props> = ({ logoPath, title }) => {
  return (
    <HeaderContainer>
      <Link href={routes.HOME}>
        <Logo alt="logo" src={logoPath} />
      </Link>
      <Title>
        <FormattedMessage id={title} />
      </Title>
      <Icon color="white" size={24} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  ${typography.h1}
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${getSpacing(11)};
  padding: ${getSpacing(3)};
  background-color: ${colorPalette.primary1};
  position: sticky;
  top: 0;
  z-index: ${zIndex.header};
`;

const Title = styled.h1`
  ${typography.main}
  color: white;
  flex-grow: 1;
`;

const Logo = styled.img`
  height: ${getSpacing(9)};
  margin-right: ${getSpacing(3)};
`;

const Icon = styled(BurgerMenu)``;
