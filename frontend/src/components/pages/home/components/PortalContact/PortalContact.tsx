import { FormattedMessage } from 'react-intl';
import { Plus } from 'components/Icons/Plus';
import { Minus } from 'components/Icons/Minus';
import { usePortalContact } from './usePortalContact';

interface PortalContactContentProps {
  className?: string;
  addressLine1: string;
  addressLine2: string;
  number: string;
  mail: string;
}

export interface PortalContactProps extends PortalContactContentProps {
  name: string;
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
    <>
      <div className="hidden desktop:flex flex-col text-greySoft">
        <PortalContactTitle name={name} />
        <PortalContactContent
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          number={number}
          mail={mail}
        />
      </div>
      <div className="desktop:hidden text-greySoft">
        <div
          className={`
          flex justify-between items-center pb-2.5 outline-none
          ${openState === 'CLOSED' ? 'border-b border-solid border-greySoft' : ''}`}
          onClick={updatePanelState}
        >
          <PortalContactTitle name={name} />
          {openState === 'OPENED' ? (
            <Minus size={24} className="flex-shrink-0" />
          ) : (
            <Plus size={24} className="flex-shrink-0" />
          )}
        </div>
        <PortalContactContent
          className={openState === 'CLOSED' ? 'hidden' : 'block'}
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          number={number}
          mail={mail}
        />
      </div>
    </>
  );
};

const PortalContactTitle: React.FC<{ name: string }> = ({ name }) => (
  <p
    className="
        text-Mobile-C1 desktop:text-H3
        font-bold
        desktop:mb-3.5"
  >
    {name}
  </p>
);

const PortalContactContent: React.FC<PortalContactContentProps> = ({
  className = '',
  addressLine1,
  addressLine2,
  number,
  mail,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-4">
        <p>{addressLine1}</p>
        <p>{addressLine2}</p>
      </div>
      <div>
        <p>{number}</p>
        <a href={`mailto:${mail}`} className="underline">
          <FormattedMessage id="home.mailTo" />
        </a>
      </div>
    </div>
  );
};
