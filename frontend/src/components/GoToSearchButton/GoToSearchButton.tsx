import { Link } from 'components/Link';

import { routes } from 'services/routes';
import { Search } from 'components/Icons/Search';
import { FormattedMessage } from 'react-intl';

interface GoToSearchButtonProps {
  className?: string;
}

export const GoToSearchButton: React.FC<GoToSearchButtonProps> = ({ className }) => {
  return (
    <Link className={className} href={routes.SEARCH}>
      <div
        className="p-2 desktop:p-3 rounded-full text-primary1 bg-white
        flex justify-center items-center hover:text-primary1-light shadow-sm transition-all"
      >
        <div className="truncate mr-1">
          <FormattedMessage id="header.goToSearch" />
        </div>
        <Search size={22} />
      </div>
    </Link>
  );
};
