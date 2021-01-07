import styled from 'styled-components';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { colorPalette, typography } from 'stylesheet';

interface Props extends NextLinkProps {
  children: React.ReactNode;
}

export const Link: React.FC<Props> = ({ children, ...nextLinkProps }) => {
  return (
    <NextLink passHref {...nextLinkProps}>
      <StyledLink>{children}</StyledLink>
    </NextLink>
  );
};

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  ${typography.main}

  color: ${colorPalette.primary1};
  transition: color 0.3s ease-in-out;
  :hover {
    color: ${colorPalette.primary3};
  }
`;

export default Link;
