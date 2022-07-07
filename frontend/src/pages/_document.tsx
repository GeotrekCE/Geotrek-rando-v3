import { getGlobalConfig } from 'modules/utils/api.config';
import parse from 'html-react-parser';
import getNextConfig from 'next/config';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const {
  publicRuntimeConfig: { style, colors, scriptsHeaderHtml, scriptsFooterHtml },
} = getNextConfig();

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    const { googleAnalyticsId } = getGlobalConfig();

    return (
      <Html style={{ scrollBehavior: 'smooth' }}>
        <Head>
          {!!googleAnalyticsId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              ></script>
              <script
                async
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${googleAnalyticsId}');`,
                }}
              />
            </>
          )}
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <style>{`
:root {
  --color-primary1-default: ${String(colors.primary1?.DEFAULT || '#AA397D')};
  --color-primary1-light: ${String(colors.primary1?.light || '#bd3e8b')};
  --color-primary2: ${String(colors.primary2 || '#F5E7EF')};
  --color-primary3: ${String(colors.primary3 || '#791150')};
  --color-greySoft-default: ${String(colors.greySoft?.DEFAULT || '#D7D6D9')};
  --color-greySoft-light: ${String(colors.greySoft?.light || '#D7D6D950')};
  --color-warning: ${String(colors.warning || '#D77E00')};
  --color-easyOK: ${String(colors.easyOK || '#4FAD79')};
  --color-hardKO: ${String(colors.hardKO || '#E25316')};
  --color-red: ${String(colors.red || '#FF7373')};
  --color-redMarker: ${String(colors.redMarker || '#E83737')};
}
`}</style>
          {scriptsHeaderHtml !== undefined && <>{parse(scriptsHeaderHtml)}</>}
        </Head>
        <body>
          <Main />
          <NextScript />
          {scriptsFooterHtml !== undefined && <>{parse(scriptsFooterHtml)}</>}
        </body>
      </Html>
    );
  }
}
