import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface Props extends NextLinkProps {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

export const Link: React.FC<Props> = ({ children, className, testId, ...nextLinkProps }) => {
  return (
    <NextLink passHref {...nextLinkProps}>
      <a className={className} data-testid={testId}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
