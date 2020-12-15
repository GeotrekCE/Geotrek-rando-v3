import styled from 'styled-components';
import { getSpacing, typography } from 'stylesheet';

export const HeaderContainer = styled.header`
  ${typography.h1}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${getSpacing(13)};
  padding: 0 ${getSpacing(4)};
`;

HeaderContainer.displayName = 'HeaderContainer';

export const Logo = styled.img`
  height: ${getSpacing(9)};
`;

Logo.displayName = 'Logo';
