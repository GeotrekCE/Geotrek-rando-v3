import styled from 'styled-components';
import parse from 'html-react-parser';
import { Details, DetailsHtml, DetailsInformationString } from 'modules/details/interface';
import { Difficulty } from 'modules/filters/difficulties/interface';
import { getSpacing } from 'stylesheet';

export const checkInformation = (
  details: Details | undefined,
  informationField: keyof DetailsInformationString,
): [boolean, string | Difficulty] => {
  const isValid =
    details !== undefined &&
    details.informations !== undefined &&
    details.informations[informationField] !== null;
  const content = details?.informations[informationField] ?? '';
  return [isValid, content];
};

export const checkAndParse = (
  details: Details | undefined,
  field: keyof DetailsHtml,
): [boolean, JSX.Element] => {
  const isValid =
    details !== undefined && details[field] !== undefined && details[field].length > 0;
  const parsedHtmlContent = details !== undefined ? parse(details[field] ?? '') : '';
  const styledHtmlContent = <HtmlText>{parsedHtmlContent}</HtmlText>;
  return [isValid, styledHtmlContent];
};

const HtmlText = styled.span`
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
