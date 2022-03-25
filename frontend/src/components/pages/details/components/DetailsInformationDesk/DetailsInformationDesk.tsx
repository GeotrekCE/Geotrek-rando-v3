import { InformationDesk } from 'modules/informationDesk/interface';
import SVG from 'react-inlinesvg';
import parse from 'html-react-parser';
import { textEllipsisAfterNLines } from 'services/cssHelpers';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { HtmlText } from '../../utils';
import { useDetailsInformationDesk } from './useDetailsInformationDesk';

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
}) => {
  const { truncateState, toggleTruncateState } = useDetailsInformationDesk();
  return (
    <div className="flex mb-8 desktop:mb-12 last:mb-0">
      <div className="h-25 w-25 flex-shrink-0 hidden desktop:block">
        <InformationDeskIcon pictogramUri={photoUrl || type.pictogramUri} />
      </div>
      <div className="desktop:px-4">
        <p className="font-bold">{name}</p>
        <p>
          {street !== null && <span>{`${street}, `}</span>}
          {postalCode !== null && <span>{`${postalCode} `}</span>}
          <span>{municipality}</span>
        </p>
        <a href={website} target="_blank" rel="noopener noreferrer">
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
        {accessibility && (
          <p style={{ marginTop: 20 }}>
            <strong className="font-bold">
              <FormattedMessage id="details.accessibility" /> :{' '}
            </strong>
            {accessibility}
          </p>
        )}

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
