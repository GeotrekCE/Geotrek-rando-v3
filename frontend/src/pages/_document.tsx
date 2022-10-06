import { getGlobalConfig } from 'modules/utils/api.config';
import parse from 'html-react-parser';
import getNextConfig from 'next/config';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ColorsConfig } from 'modules/interface';

const {
  publicRuntimeConfig: { style, colors, scriptsHeaderHtml, scriptsFooterHtml },
} = getNextConfig();

const {
  primary1: { DEFAULT: primary1 = '#aa397d', light: primary1Light = '#bd3e8b' } = {},
  primary2 = '#f5E7ef',
  primary3 = '#791150',
  greySoft: { DEFAULT: greySoft = '#d7d6d9', light: greySoftLight = '#d7d6d950' } = {},
  warning = '#d77E00',
  easyOK = '#4fad79',
  hardKO = '#e25316',
  red = '#ff7373',
  redMarker = '#e83737',
} = colors as ColorsConfig;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
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
      <Html className="scroll-smooth">
        <Head>
          {googleAnalyticsId !== null && (
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
          <style>{`
:root {
  --color-primary1-default: ${primary1};
  --color-primary1-light: ${primary1Light};
  --color-primary2: ${primary2};
  --color-primary3: ${primary3};
  --color-greySoft-default: ${greySoft};
  --color-greySoft-light: ${greySoftLight};
  --color-warning: ${warning};
  --color-easyOK: ${easyOK};
  --color-hardKO: ${hardKO};
  --color-red: ${red};
  --color-redMarker: ${redMarker};
}
`}</style>
          {style !== undefined && <style dangerouslySetInnerHTML={{ __html: style }} />}
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
