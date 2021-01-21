import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
}

export const PageHead = ({ title, description }: Props) => (
  <Head>
    <title>{title ?? 'GeoTrek'}</title>
    <meta name="description" content={description ?? 'Geotrek rando'} />
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);
