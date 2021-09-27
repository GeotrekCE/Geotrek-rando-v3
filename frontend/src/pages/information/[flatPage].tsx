import { generateResultDetailsUrl } from 'components/pages/search/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FlatPageUI } from 'components/pages/flatPage';
import { QueryClient } from 'react-query';
import { getFlatPageDetails } from '../../modules/flatpage/connector';
import { getHeaderConfig } from '../../modules/header/utills';
import { getGlobalConfig } from '../../modules/utils/api.config';
import { isUrlString } from '../../modules/utils/string';

export const getServerSideProps = async (context: {
  locale: string;
  query: { flatPage: string };
  res: any;
  req: any;
}) => {
  const id = isUrlString(context.query.flatPage) ? context.query.flatPage.split('-')[0] : '';

  const queryClient = new QueryClient();

  const details = await getFlatPageDetails(id, context.locale);

  await queryClient.prefetchQuery(`flatPageDetails-${id}-${context.locale}`, () => details);

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
  const url = `${baseUrlTrimmed}${pathname}`;

  if (context.req.url !== pathname && process.env.NODE_ENV === 'production') {
    // We do a permanent redirect to help search engine to find new version
    context.res.writeHead(301, { location: url });
    context.res.end();
  }

  return { props: {} };
};

const TouristicContent: NextPage = () => {
  const router = useRouter();
  const { flatPage } = router.query;
  return <FlatPageUI flatPageUrl={flatPage} />;
};

export default TouristicContent;
