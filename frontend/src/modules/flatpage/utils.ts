import parse, { DOMNode, Element } from 'html-react-parser';
import { Suggestion } from 'modules/home/interface';

export const getSuggestionType = (rawType?: string) => {
  switch (rawType) {
    case 'touristicContent':
      return 'service';
    case 'touristicEvent':
      return 'events';
    case 'outdoorSite':
      return 'outdoor';
    default:
      return 'trek';
  }
};
export const getSuggestionsFromContent = (rawContent: string) => {
  const content = rawContent;
  const domNodes: Element[] = [];
  parse(content, {
    replace: (domNode: DOMNode) => {
      const isSuggestionNode =
        domNode instanceof Element &&
        domNode.attribs &&
        'data-ids' in domNode.attribs &&
        'data-type' in domNode.attribs;

      if (isSuggestionNode) {
        domNodes.push(domNode);
      }
      return domNode;
    },
  });

  const suggestions: Suggestion[] = domNodes.map(domNode => ({
    iconUrl: '',
    titleTranslationId: domNode.attribs['data-label'],
    ids: domNode.attribs['data-ids'].split(','),
    type: getSuggestionType(domNode.attribs['data-type']),
  }));

  return suggestions;
};
