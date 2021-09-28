import { generateResultDetailsUrl } from 'components/pages/search/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { DetailsUI } from 'components/pages/details';
import { useEffect } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getDetails, getTrekFamily } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';
import { getDefaultLanguage, getHeaderConfig } from 'modules/header/utills';
import { getGlobalConfig } from '../../modules/utils/api.config';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async (context: {
  locale: string;
  query: { detailsId: string | undefined; parentId: string | undefined };
  res: any;
  req: any;
}) => {
  const id = isUrlString(context.query.detailsId) ? context.query.detailsId.split('-')[0] : '';
  const parentIdString = isUrlString(context.query.parentId) ? context.query.parentId : '';

  const queryClient = new QueryClient();

  const details = await getDetails(id, context.locale);

  await queryClient.prefetchQuery(`details-${id}-${context.locale}`, () => details);
  await queryClient.prefetchQuery(`trekFamily-${parentIdString}-${context.locale}`, () =>
    getTrekFamily(parentIdString, context.locale),
  );

  // Url calculation
  const baseUrl = getGlobalConfig().baseUrl;
  const baseUrlLocalised =
    getHeaderConfig().menu.defaultLanguage === context.locale
      ? baseUrl
      : `${baseUrl}/${context.locale}`;
  const baseUrlTrimmed = baseUrlLocalised.endsWith('/')
    ? baseUrlLocalised.slice(0, -1)
    : baseUrlLocalised;
  const pathname = generateResultDetailsUrl(id, details.title);
  let url = `${baseUrlTrimmed}${pathname}`;

  if (context.query.parentId) url = `${url}?parentId=${context.query.parentId}`;

  if (context.req.url !== pathname && process.env.NODE_ENV === 'production') {
    // We do a permanent redirect to help search engine to find new version
    context.res.writeHead(301, { location: url });
    context.res.end();
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Details: NextPage = () => {
  const router = useRouter();
  const { detailsId, parentId } = router.query;
  const language = router.locale ?? getDefaultLanguage();

  useEffect(() => {
    // Force to scroll top on page refresh
    window.history.scrollRestoration = 'manual';
  }, []);

  return <DetailsUI detailsId={detailsId} parentId={parentId} language={language} />;
};

export default Details;
