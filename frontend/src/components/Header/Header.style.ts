import styled from 'styled-components';
import { oldGetSpacing, typography, zIndex } from 'stylesheet';

export const HeaderContainer = styled.header`
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

export const Title = styled.h1`
  ${typography.h1}
`;
Title.displayName = 'HeaderTitle';

export const Logo = styled.img`
  height: ${oldGetSpacing(9)};
`;

Logo.displayName = 'Logo';
