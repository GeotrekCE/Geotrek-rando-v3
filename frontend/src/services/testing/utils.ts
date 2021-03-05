import { getGlobalConfig } from 'modules/utils/api.config';
import nock from 'nock';
import { APIQuery } from 'services/api/interface';

export const pushArgsFromLinkHref = <T extends string>(href: T): [T, T, { shallow: undefined }] => [
  href,
  href,
  { shallow: undefined },
];

/** Mock a server route with nock */
export const mockRoute = ({
  route,
  mockData,
  additionalQueries = {},
  times = 1,
}: {
  route: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockData: any;
  additionalQueries?: Partial<APIQuery>;
  times?: number;
}): void => {
  nock(getGlobalConfig().apiUrl)
    .get(route)
    .query({ language: 'fr', ...additionalQueries })
    .times(times)
    .reply(200, mockData);
};
