import { getGlobalConfig } from 'modules/utils/api.config';
import nock from 'nock';
import { APIQuery, APIResponseForList } from 'services/api/interface';

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
  mockData: APIResponseForList<unknown>;
  additionalQueries?: Partial<APIQuery>;
  times?: number;
}): void => {
  nock(getGlobalConfig().apiUrl)
    .get(route)
    .query({ language: 'fr', ...additionalQueries })
    .times(times)
    .reply(200, mockData);
};
