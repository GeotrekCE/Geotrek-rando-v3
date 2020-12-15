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
  color: ${colorPalette.greyDark};
  transition: color 0.3s ease-in-out;
  :hover {
    color: ${colorPalette.amberDark};
  }
`;

export default Link;
