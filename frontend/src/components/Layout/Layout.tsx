import { Header } from 'components/Header';
import ConditionallyRender from 'components/ConditionallyRender';
import Loader from 'components/Loader';
import Head from 'next/head';
import { useNavigationLoader } from './useRedirection';
import { useExternalsScripts } from './useExternalScripts';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isNavigationLoading } = useNavigationLoader();
  const { scriptsHeader, scriptsFooter } = useExternalsScripts(true);

  return (
    <>
      <Head>{scriptsHeader && <>{scriptsHeader}</>}</Head>
      <div className="flex flex-col min-h-full">
        <Header />
        <main className="relative grow">
          <ConditionallyRender client>
            <Loader loaded={!isNavigationLoading} className="z-loader absolute inset-0">
              {children}
            </Loader>
          </ConditionallyRender>
          <ConditionallyRender server>{children}</ConditionallyRender>
        </main>
      </div>
      {scriptsFooter && <>{scriptsFooter}</>}
    </>
  );
};
