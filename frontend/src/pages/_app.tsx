import { AppProps } from 'next/app';

import { Root } from 'components/pages/_app/Root';
import { Hydrate } from 'react-query/hydration';
import { ONE_MINUTE } from 'services/constants/staleTime';
import { captureException } from 'services/sentry';
import 'tailwindcss/tailwind.css';
import '../public/fonts.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../public/style.css';

import { ReactQueryDevtools } from 'react-query/devtools';
import { ListAndMapProvider } from 'modules/map/ListAndMapContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE,
    },
  },
});

interface MyAppProps extends AppProps {
  hasError: boolean;
  errorEventId?: string;
}

const MyApp = ({ Component, pageProps, hasError, errorEventId }: MyAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Root hasError={hasError} errorEventId={errorEventId}>
          <ListAndMapProvider>
            <Component {...pageProps} />
          </ListAndMapProvider>
        </Root>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
};

MyApp.getInitialProps = async (props: any): Promise<any> => {
  const { Component, ctx } = props;
  try {
    const pageProps =
      Component.getInitialProps !== undefined ? await Component.getInitialProps(ctx) : {};
    return { pageProps, hasError: false, errorEventId: undefined };
  } catch (error) {
    console.error(error);
    // Capture errors that happen during a page's getInitialProps.
    // This will work on both client and server sides.
    const errorEventId = captureException(error, ctx);
    return {
      hasError: true,
      errorEventId,
      pageProps: {},
    };
  }
};

export default MyApp;
