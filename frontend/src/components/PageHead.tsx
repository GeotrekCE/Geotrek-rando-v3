import Head from 'next/head';

interface Props {
  title?: string;
}

export const PageHead = ({ title }: Props) => (
  <Head>
    <title>{title ?? 'GeoTrek'}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);
