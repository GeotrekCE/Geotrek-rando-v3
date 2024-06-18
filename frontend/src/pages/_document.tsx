import getNextConfig from 'next/config';
import { Head, Html, Main, NextScript } from 'next/document';
import { ColorsConfig } from 'modules/interface';

const {
  publicRuntimeConfig: {
    style,
    colors,
    global: { groupTreksAndOutdoorFilters },
  },
} = getNextConfig();

const MyDocument: React.FC = () => {
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
    categories: {
      trek = '#001B84',
      service = '#3B89A2',
      events = '#62AB41',
      outdoor = '#E69736',
    } = {},
  } = colors as ColorsConfig;

  const outdoorColor =
    groupTreksAndOutdoorFilters === true
      ? colors?.categories?.trek || trek
      : colors?.categories?.outdoor || outdoor;

  return (
    <Html className="scroll-smooth">
      <Head>
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
  --color-trek: ${trek};
  --color-service: ${service};
  --color-outdoor: ${outdoorColor};
  --color-events: ${events};
}
`}</style>
        {style !== undefined && <style dangerouslySetInnerHTML={{ __html: style }} />}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
