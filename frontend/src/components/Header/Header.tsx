import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { routes } from 'services/routes';
import BurgerMenu from '../BurgerMenu';

interface Props {
  logoPath: string;
}

export const Header: React.FC<Props> = ({ logoPath }) => {
  return (
    <>
      <BurgerMenu />
      <div className="h-11 bg-primary1 flex flex-row items-center sticky top-0 z-10">
        <Link href={routes.HOME}>
          <img className="h-9 mx-3" alt="logo" src={logoPath} />
        </Link>
        <h1 className="flex-1 text-white">
          <FormattedMessage id={'home.title'} />
        </h1>
      </div>
    </>
  );
};
