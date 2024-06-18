import { NextPage } from 'next';
import { Link } from 'components/Link';
import { FormattedMessage } from 'react-intl';

const Custom404: NextPage = () => {
  return (
    <>
      <div className="mt-16 flex size-full items-center justify-center">
        <h1 className="m-8 pr-8 text-3xl font-bold border-r border-solid border-black">404</h1>
        <p>
          <FormattedMessage id={'page.not-found'} />
        </p>
      </div>

      <hr className="h-16 border-0" />

      <div className="flex size-full items-center justify-center">
        <Link
          className="py-3 px-4 border border-solid border-primary1 rounded-lg text-primary1 bg-white font-semibold transition transition-color hover:bg-primary2 focus:bg-primary2"
          href="/"
        >
          <FormattedMessage id={'page.back'} />
        </Link>
      </div>
    </>
  );
};

export default Custom404;
