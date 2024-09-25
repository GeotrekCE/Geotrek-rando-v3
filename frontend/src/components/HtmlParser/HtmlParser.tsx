import { useExternalsScripts } from 'components/Layout/useExternalScripts';
import parse, { attributesToProps, DOMNode, domToReact, Element } from 'html-react-parser';
import { useIntl } from 'react-intl';

interface HtmlParserProps {
  template?: string;
  id?: string;
  type?: string;
  cityCode?: string;
}

interface ParserOptionsProps {
  needsConsent: boolean;
  triggerConsentModal: () => void;
}

const option = ({ needsConsent, triggerConsentModal }: ParserOptionsProps) => ({
  replace: (domNode: DOMNode) => {
    if (
      domNode instanceof Element &&
      domNode.attribs &&
      'data-trigger-consent-modal' in domNode.attribs
    ) {
      if (!needsConsent) {
        return null;
      }
      const props = attributesToProps(domNode.attribs);
      return (
        <button {...props} onClick={triggerConsentModal}>
          {domToReact(domNode.children as DOMNode[])}
        </button>
      );
    }
    return domNode;
  },
});

export const HtmlParser = ({ template, ...propsToReplace }: HtmlParserProps) => {
  const { needsConsent, triggerConsentModal } = useExternalsScripts();
  const { locale } = useIntl();

  if (!template) {
    return null;
  }

  let nextTemplate = template;
  Object.entries({ language: locale, ...propsToReplace }).forEach(([key, value]) => {
    if (nextTemplate.includes(`{{ ${key} }}`)) {
      nextTemplate = nextTemplate.replaceAll(`{{ ${key} }}`, value);
    }
  });

  return <>{parse(nextTemplate, option({ needsConsent, triggerConsentModal }))}</>;
};

export default HtmlParser;
