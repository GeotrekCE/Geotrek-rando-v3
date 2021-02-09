import { routes } from 'services/routes';
import styled from 'styled-components';
import { getSpacing } from 'stylesheet';
import { generateResultDetailsUrl } from '../search/utils';

export const HtmlText = styled.div`
  & > b {
    font-weight: bold;
  }
  & > a > b {
    font-weight: bold;
  }
  & > em {
    font-style: italic;
  }
  & > p > em {
    font-style: italic;
  }
  & > strong {
    font-weight: bold;
  }
  & > p > strong {
    font-weight: bold;
  }
  & > ul {
    margin-top: ${getSpacing(2)};
    margin-bottom: ${getSpacing(2)};
  }
  & > ul > li {
    padding-left: ${getSpacing(2)};
    display: list-item;
    list-style-type: disc;
    list-style-position: inside;
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

export const generateChildrenDetailsUrl = (id: number, title: string, parentId: string): string => {
  const detailsUrl = generateResultDetailsUrl(id, title);
  return `${detailsUrl}?parentId=${parentId}`;
};

export const generateTouristicContentUrl = (id: number | string, title: string): string => {
  const titleWithNoSpace = title.replace(/ /g, '-');
  return `${routes.TOURISTIC_CONTENT}/${id}-${encodeURI(titleWithNoSpace)}`;
};
