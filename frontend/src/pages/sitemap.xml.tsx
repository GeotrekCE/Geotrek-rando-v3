import React from 'react';
import { getHeaderConfig } from 'modules/header/utills';
import { getApiCallsConfig } from 'modules/utils/api.config';
import { generateResultDetailsUrl } from 'components/pages/search/utils';

const LIMIT = 10000; // This limit is high so we don't have to iterate through result, one call willl get us every treks or touristic content we need

const portalFilter =
  getApiCallsConfig().portalIds.length > 0
    ? `&portals=${getApiCallsConfig().portalIds.join(',')}`
    : '';

const getTreksForLanguage = async (language: string): Promise<{ id: string; name: string }[]> => {
  const treks = await fetch(
    `${
      getApiCallsConfig().apiUrl
    }/trek/?language=${language}&fields=id,name&page_size=${LIMIT}${portalFilter}`,
  );
  const response = await treks.json();
  return response.results;
};

const getTouristicContentsForLanguage = async (
  language: string,
): Promise<{ id: string; name: string }[]> => {
  const treks = await fetch(
    `${
      getApiCallsConfig().apiUrl
    }/touristiccontent/?language=${language}&fields=id,name&page_size=${LIMIT}${portalFilter}`,
  );
  const response = await treks.json();
  return response.results;
};

const getFlatPagesForLanguage = async (
  language: string,
): Promise<{ id: string; title: string; external_url: string }[]> => {
  const flatPages = await fetch(
    `${
      getApiCallsConfig().apiUrl
    }/flatpage?language=${language}&fields=external_url,id,title&page_size=${LIMIT}${portalFilter}`,
  );
  const response = await flatPages.json();
  return response.results;
};

const getApiContentForLanguage = async (language: string): Promise<string> => {
  const baseUrl =
    getHeaderConfig().menu.defaultLanguage === language
      ? getApiCallsConfig().baseUrl
      : `${getApiCallsConfig().baseUrl}/${language}`;
  const treks = await getTreksForLanguage(language);
  const trekUrls = treks
    .map(({ id, name }) => `<url><loc>${baseUrl}/${generateResultDetailsUrl(id, name)}</loc></url>`)
    .join('');
  const touristicContents = await getTouristicContentsForLanguage(language);
  const touristicContentUrls = touristicContents
    .map(
      ({ id, name }) =>
        `<url><loc>${baseUrl}/service/${id}-${encodeURI(name.replace(/ /g, '-'))}</loc></url>`,
    )
    .join('');
  const flatPages = await getFlatPagesForLanguage(language);
  const flatPageUrls = flatPages
    .map(({ id, title, external_url }) =>
      external_url !== null && external_url.length > 0
        ? `<url><loc>${external_url}</loc></url>`
        : `<url><loc>${baseUrl}/information/${id}-${encodeURI(
            title.replace(/ /g, '-'),
          )}</loc></url>`,
    )
    .join('');
  return [
    `<url><loc>${baseUrl}</loc></url>`,
    `<url><loc>${baseUrl}/search</loc></url>`,
    trekUrls,
    touristicContentUrls,
    flatPageUrls,
  ].join('');
};

const generateSitemap = async () => {
  // Fetch all needed data from API
  try {
    const urlSet = await Promise.all(
      getHeaderConfig().menu.supportedLanguages.map(language => getApiContentForLanguage(language)),
    );
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet.join(
      '',
    )}</urlset>`;

    return sitemap.replace(/&/g, '&amp;');
  } catch (error) {
    console.error(error);
  }
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }: { res: any }) {
    const sitemap = await generateSitemap();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  }
}

export default Sitemap;
