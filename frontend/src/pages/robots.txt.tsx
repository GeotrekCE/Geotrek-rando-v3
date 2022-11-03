import { getGlobalConfig } from 'modules/utils/api.config';
import { NextPageContext } from 'next';
import React from 'react';

const getRobots = () => `User-agent: *
${getGlobalConfig().enableIndexation ? 'Allow: /' : 'Disallow: /'}
Disallow: /offline
Sitemap: ${getGlobalConfig().baseUrl}/sitemap.xml
`;

class Sitemap extends React.Component {
  public static getInitialProps({ res }: NextPageContext): void {
    res?.setHeader('Content-Type', 'text/plain');
    res?.write(getRobots());
    res?.end();
  }
}

export default Sitemap;
