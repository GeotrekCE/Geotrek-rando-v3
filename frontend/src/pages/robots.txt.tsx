import { getGlobalConfig } from 'modules/utils/api.config';
import React from 'react';

const getRobots = () => `User-agent: *
Sitemap: ${getGlobalConfig().baseUrl}/sitemap.xml
${getGlobalConfig().enableIndexation ? '' : 'Disallow: /'}
`;

class Sitemap extends React.Component {
  public static getInitialProps({ res }: { res: any }) {
    res.setHeader('Content-Type', 'text/plain');
    res.write(getRobots());
    res.end();
  }
}

export default Sitemap;
