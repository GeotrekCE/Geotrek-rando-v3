import { FormattedMessage } from 'react-intl';
import { Plus } from 'components/Icons/Plus';
import { Minus } from 'components/Icons/Minus';
import { usePortalContact } from './usePortalContact';
import { PortalContact as PortalContactInterface } from '../interface';

interface PortalContactProps extends Partial<PortalContactInterface> {
  className?: string;
}

export const PortalContact: React.FC<PortalContactProps> = ({
  name,
  addressLine1,
  addressLine2,
  number,
  mail,
}) => {
  const { openState, updatePanelState } = usePortalContact();

  return (
    <div id="footer_portal">
      <div id="footer_portalDesktop" className="hidden desktop:flex flex-col text-greySoft">
        {name !== undefined && <PortalContactTitle name={name} />}
        <PortalContactContent
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          number={number}
          mail={mail}
        />
      </div>
      <div id="footer_portalMobile" className="desktop:hidden text-greySoft">
        <div
          className={`
          flex justify-between items-center pb-2.5 outline-none
          ${openState === 'CLOSED' ? 'border-b border-solid border-greySoft' : ''}`}
          onClick={updatePanelState}
        >
          {name !== undefined && <PortalContactTitle name={name} />}
          {openState === 'OPENED' ? (
            <Minus size={24} className="shrink-0" />
          ) : (
            <Plus size={24} className="shrink-0" />
          )}
        </div>
        <PortalContactContent
          className={
            openState === 'CLOSED' ? 'hidden' : 'block border-b border-solid border-greySoft'
          }
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          number={number}
          mail={mail}
        />
      </div>
    </div>
  );
};

const PortalContactTitle: React.FC<{ name: string }> = ({ name }) => (
  <p
    id="footer_portalTitle"
    className="
        text-Mobile-C1 desktop:text-H3
        font-bold cursor-pointer w-full
        desktop:mb-3.5"
  >
    {name}
  </p>
);

const PortalContactContent: React.FC<Partial<PortalContactProps>> = ({
  className,
  addressLine1,
  addressLine2,
  number,
  mail,
}) => {
  return (
    <div
      id="footer_portalContactContent"
      className={`flex flex-col ${className ?? ''} pb-4 text-Mobile-C3 desktop:text-P1`}
    >
      {(addressLine1 !== undefined || addressLine2 !== undefined) && (
        <div className="mb-3">
          <p>{addressLine1}</p>
          <p>{addressLine2}</p>
        </div>
      )}
      <div>
        <p>{number}</p>
        {mail !== undefined && (
          <a href={`mailto:${mail}`} className="underline">
            <FormattedMessage id="home.mailTo" />
          </a>
        )}
      </div>
    </div>
  );
};
