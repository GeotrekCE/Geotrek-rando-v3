import { NextPage } from 'next';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const OfflineFallback: NextPage = () => {
  return (
    <>
      <div className="mt-16 flex size-full items-center justify-center">
        <h1 className="m-8 pr-8 text-3xl font-bold border-r border-solid border-black">
          <FormattedMessage id={'offline.title'} />
        </h1>
        <p>
          <FormattedMessage id={'offline.not-available'} />
        </p>
      </div>

      <hr className="h-16 border-0" />

      <div className="flex size-full items-center justify-center">
        <Link
          className="py-3 px-4 border border-solid border-primary1 rounded-lg text-primary1 bg-white font-semibold transition transition-color hover:bg-primary2 focus:bg-primary2"
          href="/offline"
        >
          <FormattedMessage id={'page.goToOffline'} />
        </Link>
      </div>
    </>
  );
};

export default OfflineFallback;
