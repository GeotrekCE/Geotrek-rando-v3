import { InformationDesk } from 'modules/informationDesk/interface';
import SVG from 'react-inlinesvg';
import parse from 'html-react-parser';
import { textEllipsisAfterNLines } from 'services/cssHelpers';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { ListAndMapContext } from 'modules/map/ListAndMapContext';
import { useContext } from 'react';
import { HtmlText } from '../../utils';
import { useDetailsInformationDesk } from './useDetailsInformationDesk';
import DetailsInformationDeskLocation from './DetailsInformationDeskLocation';

interface DetailsInformationDeskProps extends InformationDesk {
  className?: string;
}

export const DetailsInformationDesk: React.FC<DetailsInformationDeskProps> = ({
  accessibility,
  name,
  street,
  postalCode,
  municipality,
  website,
  email,
  phone,
  description,
  photoUrl,
  type,
  latitude,
  longitude,
}) => {
  const { truncateState, toggleTruncateState } = useDetailsInformationDesk();
  const { setHoveredCardId } = useContext(ListAndMapContext);
  return (
    <div
      className="flex mb-8 desktop:mb-12 last:mb-0"
      onMouseEnter={() => {
        setHoveredCardId(`${latitude}${longitude}`);
      }}
      onMouseLeave={() => {
        setHoveredCardId(null);
      }}
    >
      <div className="h-25 w-25 flex-shrink-0 hidden desktop:block">
        <InformationDeskIcon pictogramUri={photoUrl || type.pictogramUri} />
      </div>
      <div className="w-full desktop:pl-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-auto">
            <p className="font-bold">{name}</p>
            <p>
              {street !== null && <span>{`${street}, `}</span>}
              {postalCode !== null && <span>{`${postalCode} `}</span>}
              <span>{municipality}</span>
            </p>
          </div>
          {longitude && latitude && (
            <DetailsInformationDeskLocation longitude={longitude} latitude={latitude} />
          )}
        </div>
        <a className="break-all" href={website} target="_blank" rel="noopener noreferrer">
          <p
            className="mt-2
            text-primary1 underline
            hover:text-primary1-light"
          >
            {website}
          </p>
        </a>
        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
          <p
            className="
            text-primary1 underline
            hover:text-primary1-light"
          >
            {email}
          </p>
        </a>
        <p className="text-primary1">{phone}</p>

        <div className="flex flex-col desktop:flex-row desktop:items-end mt-4">
          {truncateState === 'TRUNCATE' ? (
            <TruncatedHtmlText>{parse(description)}</TruncatedHtmlText>
          ) : (
            <HtmlText>{parse(description)}</HtmlText>
          )}
          <span
            className="text-primary1 underline cursor-pointer flex-shrink-0 desktop:ml-1"
            onClick={toggleTruncateState}
          >
            <FormattedMessage
              id={truncateState === 'TRUNCATE' ? 'details.knowMore' : 'details.close'}
            />
          </span>
        </div>

        {accessibility && (
          <div className="mt-5">
            <strong className="font-bold">
              <FormattedMessage id="details.accessibility" /> :{' '}
            </strong>
            <HtmlText>{parse(accessibility)}</HtmlText>
          </div>
        )}
      </div>
    </div>
  );
};

const InformationDeskIcon: React.FC<{ pictogramUri: string }> = ({ pictogramUri }) => {
  if (RegExp(/(.*).svg/).test(pictogramUri)) {
    return <SVG src={pictogramUri} className="h-full w-full m-1" />;
  }
  return (
    <img
      className="object-cover object-contain h-full w-full rounded-full overflow-hidden"
      src={pictogramUri}
      alt=""
    />
  );
};

const TruncatedHtmlText = styled(HtmlText)`
  ${textEllipsisAfterNLines(2)}
`;
