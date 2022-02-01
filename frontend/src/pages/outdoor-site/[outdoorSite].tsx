import { OutdoorSiteUI } from 'components/pages/site';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { QueryClient } from 'react-query';
import { routes } from 'services/routes';
import { getOutdoorSiteDetails } from '../../modules/outdoorSite/connector';
import { isUrlString } from '../../modules/utils/string';
import { redirectIfWrongUrl } from '../../modules/utils/url';
import Custom404 from '../404';

export const getServerSideProps = async (context: {
  locale: string;
  resolvedUrl: string;
  query: { outdoorSite: string };
  res: any;
  req: any;
}) => {
  try {
    const id = isUrlString(context.query.outdoorSite)
      ? context.query.outdoorSite.split('-')[0]
      : '';

    const queryClient = new QueryClient();

    const details = await getOutdoorSiteDetails(id, context.locale);

    await queryClient.prefetchQuery(`outdoorSiteDetails-${id}-${context.locale}`, () => details);

    const redirect = redirectIfWrongUrl(id, details.name, context, routes.OUTDOOR_SITE);
    if (redirect)
      return {
        redirect,
      };

    return { props: {} };
  } catch (error) {
    return {
      props: {
        errorCode: String(error).includes('NOT_FOUND') ? 404 : 500,
      },
    };
  }
};

interface Props {
  errorCode?: number;
}

const OutdoorSite: NextPage<Props> = ({ errorCode }) => {
  const router = useRouter();
  const { outdoorSite } = router.query;
  const language = router.locale ?? getDefaultLanguage();

  if (errorCode === 404) return <Custom404 />;

  return <OutdoorSiteUI outdoorSiteUrl={outdoorSite} language={language} />;
};

export default OutdoorSite;
