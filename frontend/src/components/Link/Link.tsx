import styled from 'styled-components';
import { colorPalette, typography } from 'stylesheet';

interface LinkAttrs {
  href?: string;
  to?: string;
  disabled?: boolean;
}

const Link = styled.a<LinkAttrs>`
  text-decoration: none;
  cursor: pointer;
  ${typography.bold}
  color: ${colorPalette.greyDarkColored};
  transition: color 0.3s ease-in-out;
  :hover {
    color: ${colorPalette.primary3};
  }
`;

export default Link;
