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

export const checkAndParseToText = (
  details: Details | undefined,
  field: keyof DetailsHtml,
): [boolean, JSX.Element] => {
  const isValid =
    details !== undefined && details[field] !== undefined && details[field].length > 0;
  const parsedHtmlContent = details !== undefined ? parse(details[field] ?? '') : '';
  const styledHtmlContent = <HtmlText>{parsedHtmlContent}</HtmlText>;
  return [isValid, styledHtmlContent];
};

const matchSingle = (regex: RegExp, text: string): string => {
  const reg = RegExp(regex).exec(text);
  if (reg !== null) return reg[1];
  return '';
};

export const checkAndParseToList = (
  description?: string,
): [boolean, JSX.Element | undefined, JSX.Element[] | undefined] => {
  const isValid = description !== undefined && description.length > 0;
  if (!isValid) return [false, undefined, undefined];

  const fullText = description ?? '';

  let intro = matchSingle(/(.*?)<ol>/, fullText);
  intro = intro.length === 0 ? fullText : intro;
  const styledIntro = intro.length > 0 ? <HtmlText>{parse(intro)}</HtmlText> : undefined;

  const list = fullText.match(/<li>(.*?)<\/li>/g);
  const styledList = list
    ? list?.map((l, i) => <HtmlText key={i}>{parse(matchSingle(/<li>(.*?)<\/li>/, l))}</HtmlText>)
    : undefined;

  return [isValid, styledIntro, styledList];
};

export const HtmlText = styled.div`
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
