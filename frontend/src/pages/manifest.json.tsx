import { default as getNextConfig } from 'next/config';
import React from 'react';

class ManifestJson extends React.Component {
  public static getInitialProps({ res }: { res: any }) {
    const {
      publicRuntimeConfig: { global },
    } = getNextConfig();

    const appName = String(global.applicationName);

    const content = `{
  "name": "${appName}",
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "icons": [
    { "src": "/medias/maskable-icon.png", "sizes": "200x200", "purpose": "maskable", "type": "image/png" },
    { "src": "/medias/apple-icon.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/medias/android-icon.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/medias/apple-splashscreen.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/medias/android-splashscreen.png", "sizes": "512x512", "type": "image/png" }
  ],
  "scope": ".",
  "start_url": "./"
}`;

    res.setHeader('Content-Type', 'text/plain');
    res.write(content);
    res.end();
  }
}

export default ManifestJson;
