import { routes } from 'services/routes';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';
import { generateResultDetailsUrl } from '../search/utils';

export const HtmlText = styled.div`
  a {
    color: ${colorPalette.primary1};
    transition-property: all;
    transition-duration: 300ms;
    &:hover {
      color: ${colorPalette.primary1_light};
    }
  }
  h1 {
    ${typography.h2}
    ${desktopOnly(css`
      ${typography.h1}
    `)}
  }
  h2 {
    ${typography.h3}
    ${desktopOnly(css`
      ${typography.h2}
    `)}
  }
  h3 {
    ${typography.h4}
    ${desktopOnly(css`
      ${typography.h3}
    `)}
  }
  p {
    margin-bottom: ${getSpacing(2)};
    ${desktopOnly(css`
      margin-bottom: ${getSpacing(4)};
    `)}
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: ${getSpacing(2)} 0;
    ${desktopOnly(css`
      margin: ${getSpacing(4)} 0;
    `)}
  }
  img {
    border-radius: ${getSpacing(4)};
    max-height: 75vh;
    width: auto;
    margin: ${getSpacing(1)} auto;
  }
  iframe {
    width: 100%;
    height: auto;
    ${desktopOnly(css`
      height: 70vh;
    `)}
  }

  b {
    font-weight: bold;
  }

  em {
    font-style: italic;
    ${typography.small}
    ${desktopOnly(css`
      ${typography.main}
    `)}
  }
  h6 {
    margin: 0 auto;
    text-align: center;
    margin-bottom: ${getSpacing(2)};
    ${desktopOnly(css`
      margin-bottom: ${getSpacing(4)};
    `)}
  }

  strong {
    font-weight: bold;
  }
  ul {
    margin-top: ${getSpacing(2)};
    margin-bottom: ${getSpacing(2)};
  }
  ul > li {
    padding-left: ${getSpacing(2)};
    display: list-item;
    list-style-type: disc;
    list-style-position: inside;
    ${desktopOnly(css`
      margin-bottom: ${getSpacing(1)};
    `)}
  }
`;

/** Computes an element top pixel and bottom pixel position */
export const getDimensions = (htmlElement: HTMLElement | null): { top: number; bottom: number } => {
  if (htmlElement === null) return { top: 0, bottom: 0 };
  const { height } = htmlElement.getBoundingClientRect();
  const elementTopPosition = htmlElement.offsetTop;
  const elementBotttomPosition = elementTopPosition + height;

  return {
    top: elementTopPosition,
    bottom: elementBotttomPosition,
  };
};

/** Generates the details page url for a trek part of an itinerance */
export const generateChildrenDetailsUrl = (
  id: string | number,
  title: string,
  parentId: string,
): string => {
  const detailsUrl = generateResultDetailsUrl(id, title);
  return `${detailsUrl}?parentId=${parentId}`;
};

export const generateTouristicContentUrl = (id: number | string, title: string): string => {
  const titleWithNoSpace = title.replace(/ /g, '-');
  return `${routes.TOURISTIC_CONTENT}/${id}-${encodeURI(titleWithNoSpace)}`;
};
