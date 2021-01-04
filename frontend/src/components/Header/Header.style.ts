import styled from 'styled-components';
import { getSpacing, typography, zIndex } from 'stylesheet';

export const HeaderContainer = styled.header`
  ${typography.h1}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${getSpacing(13)};
  padding: ${getSpacing(10)} ${getSpacing(4)};

  /* Replace background-color later */
  background-color: grey;
  position: sticky;
  top: 0;
  z-index: ${zIndex.header};
`;

HeaderContainer.displayName = 'HeaderContainer';

export const Title = styled.h1`
  ${typography.h1}
`;
Title.displayName = 'HeaderTitle';

export const Logo = styled.img`
  height: ${getSpacing(9)};
`;

Logo.displayName = 'Logo';
