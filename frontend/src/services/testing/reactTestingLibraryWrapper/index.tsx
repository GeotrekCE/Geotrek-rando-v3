// edited slightly from : https://formatjs.io/docs/react-intl/testing/#react-testing-library

import { ReactElement } from 'react';
import { RenderOptions, RenderResult, render as rtlRender } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { RouterContext } from 'next-server/dist/lib/router-context';
import { NextRouter } from 'next/dist/shared/lib/router/router';

import flattenMessages from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';
import { routerMock } from '../routerMock';

interface WrapperOptions {
  locale?: 'en' | 'fr';
  router?: Partial<NextRouter>;
}
interface RenderOptionsWithWrapperOptions extends RenderOptions {
  wrapperOptions?: WrapperOptions;
}

const locales = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

const render = (
  ui: ReactElement,
  {
    wrapperOptions: { locale = 'fr', router } = {},
    ...renderOptions
  }: RenderOptionsWithWrapperOptions = {},
): RenderResult => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
      <RouterContext.Provider value={routerMock(router)}>
        <IntlProvider locale={locale} messages={locales[locale]}>
          {children}
        </IntlProvider>
      </RouterContext.Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
