import { useExternalsScripts } from 'components/Layout/useExternalScripts';
import parse, { attributesToProps, DOMNode, domToReact, Element } from 'html-react-parser';

interface HtmlParserProps {
  template?: string;
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
          {domToReact(domNode.children)}
        </button>
      );
    }
    return domNode;
  },
});

export const HtmlParser = ({ template }: HtmlParserProps) => {
  const { needsConsent, triggerConsentModal } = useExternalsScripts();

  if (!template) {
    return null;
  }

  return <>{parse(template, option({ needsConsent, triggerConsentModal }))}</>;
};

export default HtmlParser;
