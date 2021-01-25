import { useQuery } from 'react-query';

import { getTrekGeometryResult } from 'modules/trekResult/connector';
import { TrekGeometryResult } from 'modules/trekResult/interface';

export const useTrekGeometry = (id?: number) => {
  const { data: trekGeometry } = useQuery<TrekGeometryResult, Error>(
    ['trekPopupResult', id],
    () => (id === undefined ? new Promise(() => []) : getTrekGeometryResult(id.toString())),
    { enabled: id !== undefined },
  );

  return { trekGeometry };
};
