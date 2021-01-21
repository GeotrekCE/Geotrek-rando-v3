import styled from 'styled-components';
import parse from 'html-react-parser';
import { Details, DetailsHtml, DetailsInformation } from 'modules/details/interface';
import { Difficulty } from 'modules/filters/difficulties/interface';

export const checkInformation = (
  details: Details | undefined,
  informationField: keyof DetailsInformation,
): [boolean, string | Difficulty] => {
  const isValid =
    details !== undefined &&
    details.informations !== undefined &&
    details.informations[informationField] !== null;
  const defaultValue = informationField === 'difficulty' ? { label: '', pictogramUri: '' } : '';
  const content = details?.informations[informationField] ?? defaultValue;
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

const HtmlText = styled.div`
  & > em {
    font-style: italic;
  }
  & > p > em {
    font-style: italic;
  }
`;
