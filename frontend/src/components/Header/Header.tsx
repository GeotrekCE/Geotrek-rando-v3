import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import styled from 'styled-components';
import { colorPalette, getSpacing, typography, zIndex } from 'stylesheet';
import { routes } from 'services/routes';
import { slide as Slide } from 'react-burger-menu';
import { BurgerMenu } from '../Icons/BurgerMenu';

interface Props {
  logoPath: string;
}

export const Header: React.FC<Props> = ({ logoPath }) => {
  return (
    <HeaderContainer>
      <Link href={routes.HOME}>
        <Logo alt="logo" src={logoPath} />
      </Link>
      <Title>
        <FormattedMessage id={'home.title'} />
      </Title>
      <Slide
        className="fixed top-0 right-0"
        burgerButtonClassName={'fixed w-5 h-5 top-3 right-3'}
        burgerBarClassName={'bg-white'}
        // bodyClassName={'fixed top-0'}
        menuClassName={'bg-white'}
      >
        <span>Menu</span>
      </Slide>
      {/* <Icon color="white" size={24} /> */}
    </HeaderContainer>
  );
};

const styles: Partial<CSSStyleDeclaration> = {
  color: 'white',
  bmBurgerButton: {
    position: 'fixed',
    width: '24px',
    height: '24px',
    right: '12px',
    top: '12px',
  },
  bmBurgerBars: {
    background: 'white',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
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

// const Menu = styled(slide)`
//   background-color: white;
// `;
