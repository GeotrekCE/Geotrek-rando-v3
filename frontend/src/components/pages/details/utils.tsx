import styled from 'styled-components';
import parse from 'html-react-parser';
import { Details, DetailsString } from 'modules/details/interface';

export const checkAndParse = (
  details: Details | undefined,
  field: keyof DetailsString,
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
