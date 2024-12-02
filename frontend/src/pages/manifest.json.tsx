import { NextPageContext } from 'next';
import getNextConfig from 'next/config';

const ManifestJson = (): null => {
  return null;
};

export const getServerSideProps = (props: NextPageContext) => {
  const {
    publicRuntimeConfig: { global, manifest = {} },
  } = getNextConfig();

  const { res } = props;

  if (!res) {
    return null;
  }

  const name = String(global.applicationName);
  const defaultManifest = {
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      {
        src: '/medias/maskable-icon.png',
        sizes: '200x200',
        purpose: 'maskable',
        type: 'image/png',
      },
      { src: '/medias/apple-icon.png', sizes: '144x144', type: 'image/png' },
      { src: '/medias/android-icon.png', sizes: '144x144', type: 'image/png' },
      { src: '/medias/apple-splashscreen.png', sizes: '512x512', type: 'image/png' },
      { src: '/medias/android-splashscreen.png', sizes: '512x512', type: 'image/png' },
    ],
    scope: '.',
    start_url: './',
  };

  const content = {
    name,
    ...defaultManifest,
    ...manifest,
  };
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(content, null, 2));
  res.end();
  return {
    props: {},
  };
};

export default ManifestJson;
