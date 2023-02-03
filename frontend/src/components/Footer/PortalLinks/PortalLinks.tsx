import NextLink from 'next/link';
import { Plus } from 'components/Icons/Plus';
import { Minus } from 'components/Icons/Minus';
import { FormattedMessage } from 'react-intl';
import useHasMounted from 'hooks/useHasMounted';
import { usePortalLinks } from './usePortalLinks';
import { PortalLinkStatic } from '../interface';
import { isLinkInternal, linkWithoutHost } from '../utils';

interface PortalLinksContentProps {
  className?: string;
  links: PortalLinkStatic[];
}

export interface PortalLinksProps extends PortalLinksContentProps {
  name: string;
}

export const PortalLinks: React.FC<PortalLinksProps> = ({ name, links }) => {
  const { openState, updatePanelState } = usePortalLinks();

  return (
    <>
      <div className="hidden desktop:flex flex-col text-greySoft ml-3 items-end">
        <PortalLinksTitle name={name} />
        <PortalLinksDesktopContent links={links} />
      </div>
      <div className="desktop:hidden text-greySoft">
        <div
          className={`
          flex justify-between items-center
          py-2.5 outline-none
          ${openState === 'CLOSED' ? 'border-b border-solid border-greySoft' : ''}`}
          onClick={updatePanelState}
        >
          <PortalLinksTitle name={name} />
          {openState === 'OPENED' ? (
            <Minus size={24} className="flex-shrink-0" />
          ) : (
            <Plus size={24} className="flex-shrink-0" />
          )}
        </div>
        <PortalLinksMobileContent
          links={links}
          className={
            openState === 'CLOSED' ? 'hidden' : 'block border-b border-solid border-greySoft'
          }
        />
      </div>
    </>
  );
};

const PortalLinksTitle: React.FC<{ name: string }> = ({ name }) => (
  <p
    className="
        text-Mobile-C1 desktop:text-H3
        font-bold cursor-pointer w-full
        desktop:mb-3.5 desktop:text-right"
  >
    <FormattedMessage id={name} />
  </p>
);

const PortalLinksDesktopContent: React.FC<PortalLinksContentProps> = ({
  className = '',
  links,
}) => {
  return (
    <div className={`flex flex-col pb-4 ${className}`}>
      {links.map((l, i) => (
        <PortalLinkRendered link={l} key={i} />
      ))}
    </div>
  );
};

const PortalLinksMobileContent: React.FC<PortalLinksContentProps> = ({ className = '', links }) => {
  const nbOfLinksPerColumn = Math.ceil(links.length / 2);
  return (
    <div className={`flex pb-4 ${className}`}>
      <div className="flex flex-col flex-1">
        {links.slice(0, nbOfLinksPerColumn).map((l, i) => (
          <PortalLinkRendered link={l} key={i} />
        ))}
      </div>
      <div className="flex flex-col flex-1">
        {links.slice(nbOfLinksPerColumn).map((l, i) => (
          <PortalLinkRendered link={l} key={i} />
        ))}
      </div>
    </div>
  );
};

const PortalLinkRendered: React.FC<{ link: PortalLinkStatic }> = ({ link }) => {
  const className =
    'text-greySoft text-Mobile-C3 desktop:text-P1 cursor-pointer hover:text-white transition-all desktop:text-right';
  const isWindow = useHasMounted(typeof window !== 'undefined');
  if (isWindow) {
    return isLinkInternal(link.url) ? (
      <NextLink className={className} href={linkWithoutHost(link.url)}>
        <FormattedMessage id={link.label} />
      </NextLink>
    ) : (
      <a href={link.url} target="_blank" rel="noopener noreferrer" className={className}>
        <FormattedMessage id={link.label} />
      </a>
    );
  }
  return null;
};
