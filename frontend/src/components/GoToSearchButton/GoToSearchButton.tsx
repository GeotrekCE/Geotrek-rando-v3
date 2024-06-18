import { Link } from 'components/Link';

import { routes } from 'services/routes';
import { Search } from 'components/Icons/Search';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';

interface GoToSearchButtonProps {
  className?: string;
}

export const GoToSearchButton: React.FC<GoToSearchButtonProps> = ({ className }) => {
  return (
    <Link className={cn('block', className)} href={routes.SEARCH}>
      <span
        id="goToSearch"
        className="p-2 desktop:p-3 rounded-full text-primary1 bg-white
        flex justify-center items-center gap-1 hover:text-primary1-light focus:text-primary1-light shadow-sm transition-colors"
      >
        <FormattedMessage id="header.goToSearch" />
        <Search size={22} aria-hidden />
      </span>
    </Link>
  );
};
