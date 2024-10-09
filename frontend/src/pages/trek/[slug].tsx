import { GetServerSideProps, NextPage } from 'next';
import router, { useRouter } from 'next/router';
import { DetailsUI } from 'components/pages/details';
import { dehydrate, QueryCache, QueryClient } from '@tanstack/react-query';
import { getDetails, getTrekFamily } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';
import { getDefaultLanguage } from 'modules/header/utills';
import { routes } from 'services/routes';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { isRessourceMissing } from 'services/routeUtils';
import { Details } from 'modules/details/interface';
import { redirectIfWrongUrl } from 'modules/utils/url';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async context => {
  const id = isUrlString(context.query.slug) ? context.query.slug.split('-')[0] : '';
  const parentIdString = isUrlString(context.query.parentId) ? context.query.parentId : '';
  const { locale = 'fr' } = context;

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: error => {
        if (isRessourceMissing(error)) {
          void router.push(routes.HOME);
        }
      },
    }),
  });

  try {
    const commonDictionaries = await queryClient.fetchQuery({
      queryKey: ['commonDictionaries', locale],
      queryFn: () => getCommonDictionaries(locale),
    });

    await queryClient.prefetchQuery({
      queryKey: ['details', id, locale],
      queryFn: () => getDetails(id, locale, commonDictionaries),
    });

    const details = queryClient.getQueryData<Details>(['details', id, locale]);

    await queryClient.prefetchQuery({
      queryKey: ['trekFamily', parentIdString, locale],
      queryFn: () => getTrekFamily(parentIdString, locale),
    });

    if (details !== undefined) {
      const redirect = redirectIfWrongUrl(
        id,
        details.title,
        { ...context, locale },
        routes.TREK,
        Number(parentIdString),
      );
      if (redirect)
        return {
          redirect,
        };
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
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

const Trek: NextPage<Props> = ({ errorCode }) => {
  const { query, locale } = useRouter();
  const { slug, parentId } = query;
  const language = locale ?? getDefaultLanguage();

  if (errorCode === 404) return <Custom404 />;

  return <DetailsUI slug={slug} parentId={parentId} language={language} />;
};

export default Trek;
