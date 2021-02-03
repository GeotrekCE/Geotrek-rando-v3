import styled from 'styled-components';
import parse from 'html-react-parser';
import { getSpacing } from 'stylesheet';

const matchSingle = (regex: RegExp, text: string): string => {
  const reg = RegExp(regex).exec(text);
  if (reg !== null) return reg[1];
  return '';
};

export const parseHtmlToList = (
  stringHtml: string,
): [JSX.Element | undefined, JSX.Element | undefined, JSX.Element[] | undefined] => {
  const isValid = stringHtml.length > 0;
  if (!isValid) return [undefined, undefined, undefined];

  const fullText = stringHtml ?? '';

  let intro = matchSingle(/((.|[\r\n])*?)<ol>/, fullText);
  intro = intro.length === 0 ? fullText : intro;
  const styledIntro = intro.length > 0 ? <HtmlText>{parse(intro)}</HtmlText> : undefined;

  const conclusion = matchSingle(/<\/ol>((.|[\r\n])*)/, fullText);
  const styledConclusion =
    conclusion.length > 0 ? <HtmlText>{parse(conclusion)}</HtmlText> : undefined;

  const list = fullText.match(/<li>((.|[\r\n])*?)<\/li>/g);
  const styledList = list
    ? list?.map((l, i) => (
        <HtmlText key={i}>{parse(matchSingle(/<li>((.|[\r\n])*?)<\/li>/, l))}</HtmlText>
      ))
    : undefined;

  return [styledIntro, styledConclusion, styledList];
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
