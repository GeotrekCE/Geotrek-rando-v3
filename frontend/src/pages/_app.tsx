import { AppProps } from 'next/app';

import { Root } from 'components/pages/_app/Root';
import { Hydrate } from 'react-query/hydration';
import { ONE_MINUTE } from 'services/constants/staleTime';
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

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Root>
          <ListAndMapProvider>
            <Component {...pageProps} />
          </ListAndMapProvider>
        </Root>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
