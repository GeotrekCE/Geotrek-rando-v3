import App, { AppContext, AppInitialProps } from 'next/app';

import { Root } from 'components/pages/_app/Root';
import { Hydrate } from 'react-query/hydration';
import { ONE_MINUTE } from 'services/constants/staleTime';
import { captureException } from 'services/sentry';
import '../public/fonts.css';
import 'tailwindcss/tailwind.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../public/style.css';

import { ReactQueryDevtools } from 'react-query/devtools';
import { ListAndMapProvider } from 'modules/map/ListAndMapContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getHeaderConfig } from 'modules/header/utills';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE,
    },
  },
});

const loadLocales = async ({ ctx }: AppContext) => {
  const baseUrl = ctx.req ? `http://localhost:${String(process?.env?.PORT ?? 3000)}` : '';

  const loadedLanguages = await Promise.all(
    getHeaderConfig().menu.supportedLanguages.map(async language => {
      const result = await fetch(baseUrl + `/api/translations/${language}`);
      const messages = await result.json();

      return {
        [language]: messages,
      };
    }),
  );

  return loadedLanguages.reduce(
    (messages, currentMessages) => ({
      ...messages,
      ...currentMessages,
    }),
    {},
  );
};

interface AppProps extends AppInitialProps {
  hasError: boolean;
  errorEventId?: string;
  messages: {
    [language: string]: {
      [messageId: string]: string;
    };
  };
}

class MyApp extends App<AppProps> {
  static async getInitialProps(props: any): Promise<AppProps> {
    const { Component, ctx } = props;

    try {
      const pageProps =
        Component.getInitialProps !== undefined ? await Component.getInitialProps(ctx) : {};
      const messages = await loadLocales(props);
      return { pageProps, hasError: false, errorEventId: undefined, messages };
    } catch (error) {
      console.error(error);
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      const errorEventId = captureException(error, ctx);
      return {
        hasError: true,
        errorEventId,
        pageProps: {},
        messages: {},
      };
    }
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { Component, pageProps, hasError, errorEventId, messages } = this.props;

    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Root hasError={hasError} errorEventId={errorEventId} messages={messages}>
            <ListAndMapProvider>
              <Component {...pageProps} />
            </ListAndMapProvider>
          </Root>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    );
  }
}

export default MyApp;
