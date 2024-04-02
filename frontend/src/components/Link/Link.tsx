import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { cn } from 'services/utils/cn';

interface Props extends NextLinkProps {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

export const Link: React.FC<Props> = ({ children, className = '', testId, ...nextLinkProps }) => {
  return (
    <NextLink passHref legacyBehavior {...nextLinkProps}>
      <a
        className={cn(
          'text-primary1 hover:text-primary3 focus:text-primary3 transition-colors',
          className,
        )}
        data-testid={testId}
      >
        {children}
      </a>
    </NextLink>
  );
};
export default Link;
