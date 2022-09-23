import { Header } from 'components/Header';
import ConditionallyRender from 'components/ConditionallyRender';
import { colorPalette, zIndex } from 'stylesheet';
import Loader from 'react-loader';
import { useNavigationLoader } from './useRedirection';

export const Layout: React.FC = ({ children }) => {
  const { isNavigationLoading } = useNavigationLoader();

  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-grow">
        <ConditionallyRender client>
          <Loader
            loaded={!isNavigationLoading}
            options={{
              color: colorPalette.primary1,
              zIndex: zIndex.loader,
            }}
          >
            {children}
          </Loader>
        </ConditionallyRender>
        <ConditionallyRender server>{children}</ConditionallyRender>
      </main>
    </div>
  );
};
