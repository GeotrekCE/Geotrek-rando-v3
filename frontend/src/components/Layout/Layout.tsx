import { Header } from 'components/Header';
import ConditionallyRender from 'components/ConditionallyRender';
import Loader from 'components/Loader';
import { useNavigationLoader } from './useRedirection';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isNavigationLoading } = useNavigationLoader();

  return (
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
  );
};
