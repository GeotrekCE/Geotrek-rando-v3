// edited slightly from : https://formatjs.io/docs/react-intl/testing/#react-testing-library

import { FunctionComponent, ReactElement } from 'react';
import { RenderOptions, RenderResult, render as rtlRender } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { Provider } from 'react-redux';
import { NextRouter } from 'next/dist/next-server/lib/router/router';

import flattenMessages from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import { RootState } from 'redux/types';
import configureStore from 'redux/store';
import { routerMock } from '../routerMock';

interface WrapperOptions {
  locale?: 'en' | 'fr';
  initialReduxState?: RootState;
  router?: Partial<NextRouter>;
}
interface RenderOptionsWithWrapperOptions extends RenderOptions {
  wrapperOptions?: WrapperOptions;
}

const render = (
  ui: ReactElement,
  {
    wrapperOptions: { locale = 'en', initialReduxState, router } = {},
    ...renderOptions
  }: RenderOptionsWithWrapperOptions = {},
): RenderResult => {
  const store = configureStore(undefined, initialReduxState);
  const Wrapper: FunctionComponent = ({ children }) => {
    return (
      <RouterContext.Provider value={routerMock(router)}>
        <Provider store={store}>
          <IntlProvider locale={locale} messages={flattenMessages(enMessages)}>
            {children}
          </IntlProvider>
        </Provider>
      </RouterContext.Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
