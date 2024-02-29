import { FormattedMessage } from 'react-intl';

import { Reload } from 'components/Icons/Reload';
import { UseQueryResult } from '@tanstack/react-query';

interface Props {
  refetch: () => Promise<UseQueryResult>;
}

export const ErrorFallback: React.FC<Props> = ({ refetch }) => {
  return (
    <div className="flex flex-col flex-1 items-center mt-10">
      <h1 className="text-H2 text-center">
        <FormattedMessage id="search.anErrorOccured" />
      </h1>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button type="button" className="flex mt-4 flex-col items-center" onClick={refetch}>
        <Reload size={48} />
        <span>
          <FormattedMessage id="search.reload" />
        </span>
      </button>
    </div>
  );
};
