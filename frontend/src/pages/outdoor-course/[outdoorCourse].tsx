import { OutdoorCourseUI } from 'components/pages/site/OutdoorCourseUI';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { routes } from 'services/routes';
import { redirectIfWrongUrl } from 'modules/utils/url';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { getOutdoorCourseDetails } from '../../modules/outdoorCourse/connector';
import { isUrlString } from '../../modules/utils/string';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async context => {
  const id = isUrlString(context.query.outdoorCourse)
    ? context.query.outdoorCourse.split('-')[0]
    : '';
  const { locale = 'fr' } = context;

  const queryClient = new QueryClient();

  try {
    const commonDictionaries = await getCommonDictionaries(locale);
    await queryClient.prefetchQuery(['commonDictionaries', locale], () => commonDictionaries);

    const details = await getOutdoorCourseDetails(id, locale, commonDictionaries);
    await queryClient.prefetchQuery(['outdoorCourseDetails', id, locale], () => details);

    const redirect = redirectIfWrongUrl(
      id,
      details.name,
      { ...context, locale },
      routes.OUTDOOR_COURSE,
    );
    if (redirect)
      return {
        redirect,
      };

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

const OutdoorCourse: NextPage<Props> = ({ errorCode }) => {
  const router = useRouter();
  const { outdoorCourse } = router.query;
  const language = router.locale ?? getDefaultLanguage();

  if (errorCode === 404) return <Custom404 />;

  return <OutdoorCourseUI outdoorCourseUrl={outdoorCourse} language={language} />;
};

export default OutdoorCourse;
