import NextLink from 'next/link';
import { Plus } from 'components/Icons/Plus';
import { Minus } from 'components/Icons/Minus';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';
import { useId } from 'react';
import { useExternalsScripts } from 'components/Layout/useExternalScripts';
import { usePortalLinks } from './usePortalLinks';
import { PortalLinkStatic } from '../interface';

interface PortalLinksContentProps {
  id: string;
  className?: string;
  links: PortalLinkStatic[];
}

export interface PortalLinksProps {
  name: string;
  links: PortalLinkStatic[];
}

export const PortalLinks: React.FC<PortalLinksProps> = ({ name, links }) => {
  const { openState, updatePanelState } = usePortalLinks();
  const contentId = useId();

  return (
    <div className="text-greySoft desktop:ml-3">
      <h3 className="hidden desktop:block">
        <PortalLinksTitle name={name} />
      </h3>
      <button
        className={cn(
          `
        flex justify-between items-center w-full
        py-2.5 outline-none
        desktop:hidden
        text-left`,
          openState === 'CLOSED' && 'border-b border-solid border-greySoft',
        )}
        onClick={updatePanelState}
        type="button"
        aria-expanded={openState === 'OPENED' ? 'true' : 'false'}
        aria-controls={contentId}
      >
        <PortalLinksTitle name={name} />
        {openState === 'OPENED' ? (
          <Minus size={24} className="shrink-0" />
        ) : (
          <Plus size={24} className="shrink-0" />
        )}
      </button>
      <PortalLinksContent
        id={contentId}
        links={links}
        className={
          openState === 'CLOSED'
            ? 'hidden desktop:block'
            : 'block border-b border-solid border-greySoft desktop:border-0'
        }
      />
    </div>
  );
};

const PortalLinksTitle: React.FC<{ name: string }> = ({ name }) => (
  <span
    className={cn(
      `
        block text-Mobile-C1 desktop:text-H3
        font-bold cursor-pointer w-full
        desktop:mb-3.5 desktop:text-right`,
    )}
  >
    <FormattedMessage id={name} />
  </span>
);

const PortalLinksContent: React.FC<PortalLinksContentProps> = ({ id, className = '', links }) => {
  const { needsConsent, triggerConsentModal } = useExternalsScripts();
  const classNameLink =
    'text-greySoft text-Mobile-C3 desktop:text-P1 hover:text-white focus:text-white transition-all';
  return (
    <ul id={id} className={cn('columns-2 desktop:columns-auto flex-col w-full pb-4', className)}>
      {links.map((l, i) => (
        <li key={i} className="desktop:text-right">
          <PortalLinkRendered link={l} className={classNameLink} />
        </li>
      ))}
      {needsConsent && (
        <li className="desktop:text-right desktop:mt-2">
          <button type="button" onClick={() => triggerConsentModal()} className={classNameLink}>
            <FormattedMessage id="consents.changeCookiePreference" />
          </button>
        </li>
      )}
    </ul>
  );
};

const PortalLinkRendered: React.FC<{ link: PortalLinkStatic; className?: string }> = ({
  link,
  className,
}) => (
  <NextLink
    className={className}
    href={link.url}
    {...(link.openInAnotherTab && {
      target: '_blank',
      rel: 'noopener noreferrer',
    })}
  >
    <FormattedMessage id={link.label} />
  </NextLink>
);
