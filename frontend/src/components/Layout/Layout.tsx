import { Header } from 'components/Header';
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
      <div className="flex flex-col min-h-dvh">
        <Header />
        <main className="relative grow">{children}</main>
        <Loader loaded={!isNavigationLoading} className="bg-white z-loader fixed inset-0"></Loader>
      </div>
      {scriptsFooter && <>{scriptsFooter}</>}
    </>
  );
};
