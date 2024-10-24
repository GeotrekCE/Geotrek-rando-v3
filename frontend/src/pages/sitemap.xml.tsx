import React from 'react';
import { getHeaderConfig } from 'modules/header/utills';
import { getGlobalConfig } from 'modules/utils/api.config';
import { convertStringForSitemap, generateResultDetailsUrl } from 'components/pages/search/utils';
import { NextPageContext } from 'next';

const LIMIT = 10000; // This limit is high so we don't have to iterate through result, one call will get us every treks or touristic content we need

const portalFilter =
  getGlobalConfig().portalIds.length > 0 ? `&portals=${getGlobalConfig().portalIds.join(',')}` : '';

const getTreksForLanguage = async (language: string): Promise<{ id: string; name: string }[]> => {
  const treks = await fetch(
    `${
      getGlobalConfig().apiUrl
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
      getGlobalConfig().apiUrl
    }/touristiccontent/?language=${language}&fields=id,name&page_size=${LIMIT}${portalFilter}`,
  );
  const response = await treks.json();
  return response.results;
};

const getOutdoorSiteForLanguage = async (
  language: string,
): Promise<{ id: string; name: string }[]> => {
  const treks = await fetch(
    `${
      getGlobalConfig().apiUrl
    }/outdoor_site/?&language=${language}&fields=id,name&page_size=${LIMIT}${portalFilter}`,
  );
  const response = await treks.json();
  return response.results;
};

const getOutdoorCourseForLanguage = async (
  language: string,
): Promise<{ id: string; name: string }[]> => {
  const treks = await fetch(
    `${
      getGlobalConfig().apiUrl
    }/outdoor_course/?&language=${language}&fields=id,name&page_size=${LIMIT}${portalFilter}`,
  );
  const response = await treks.json();
  return response.results;
};

const getFlatPagesForLanguage = async (
  language: string,
): Promise<{ id: string; title: string; external_url?: string }[]> => {
  const flatPages = await fetch(
    `${
      getGlobalConfig().apiUrl
    }/flatpage?language=${language}&fields=external_url,id,title&page_size=${LIMIT}${portalFilter}`,
  );
  const response = await flatPages.json();
  return response.results;
};

const getApiContentForLanguage = async (language: string): Promise<string> => {
  const baseUrl =
    getHeaderConfig().menu.defaultLanguage === language
      ? getGlobalConfig().baseUrl
      : `${getGlobalConfig().baseUrl}/${language}`;
  const treks = await getTreksForLanguage(language);
  const trekUrls = treks
    .map(({ id, name }) => `<url><loc>${baseUrl}${generateResultDetailsUrl(id, name)}</loc></url>`)
    .join('');
  const touristicContents = await getTouristicContentsForLanguage(language);
  const touristicContentUrls = touristicContents
    .map(({ id, name }) =>
      name && id
        ? `<url><loc>${baseUrl}/service/${id}-${encodeURIComponent(
            convertStringForSitemap(name),
          )}</loc></url>`
        : '',
    )
    .join('');

  const outdoorSites = getGlobalConfig().enableOutdoor
    ? await getOutdoorSiteForLanguage(language)
    : [];
  const outdoorSitesUrls = outdoorSites
    .map(({ id, name }) =>
      name && id
        ? `<url><loc>${baseUrl}/outdoor-site/${id}-${encodeURIComponent(
            convertStringForSitemap(name),
          )}</loc></url>`
        : '',
    )
    .join('');

  const outdoorCourses = getGlobalConfig().enableOutdoor
    ? await getOutdoorCourseForLanguage(language)
    : [];
  const outdoorCoursesUrls = outdoorCourses
    .map(({ id, name }) =>
      name && id
        ? `<url><loc>${baseUrl}/outdoor-course/${id}-${encodeURIComponent(
            convertStringForSitemap(name),
          )}</loc></url>`
        : '',
    )
    .join('');

  const flatPages = await getFlatPagesForLanguage(language);
  const flatPageUrls = flatPages
    .map(({ id, title, external_url = null }) =>
      external_url !== null && external_url.length > 0
        ? `<url><loc>${external_url}</loc></url>`
        : title && id
          ? `<url><loc>${baseUrl}/information/${id}-${encodeURIComponent(
              convertStringForSitemap(title),
            )}</loc></url>`
          : '',
    )
    .join('');
  return [
    `<url><loc>${baseUrl}</loc></url>`,
    `<url><loc>${baseUrl}/search</loc></url>`,
    trekUrls,
    touristicContentUrls,
    outdoorSitesUrls,
    outdoorCoursesUrls,
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
  public static async getInitialProps({ res }: NextPageContext): Promise<void> {
    const sitemap = await generateSitemap();

    res?.setHeader('Content-Type', 'text/xml');
    res?.write(sitemap);
    res?.end();
  }
}

export default Sitemap;
