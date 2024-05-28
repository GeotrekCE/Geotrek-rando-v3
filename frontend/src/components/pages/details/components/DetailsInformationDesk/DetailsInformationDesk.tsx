import { InformationDesk } from 'modules/informationDesk/interface';
import SVG from 'react-inlinesvg';
import parse from 'html-react-parser';
import { FormattedMessage } from 'react-intl';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';
import Image from 'next/image';
import { optimizeSVG } from 'stylesheet';
import { cn } from 'services/utils/cn';
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
  const { setHoveredCardId } = useListAndMapContext();
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
      {(photoUrl || type.pictogramUri) && (
        <div className="size-25 shrink-0 hidden desktop:block desktop:pr-4">
          <InformationDeskIcon pictogramUri={photoUrl || type.pictogramUri} />
        </div>
      )}

      <div className="w-full">
        <div className="flex items-center">
          <div className="shrink-0 mr-auto">
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
        {website && (
          <a
            className="break-all mt-2 table text-primary1 underline hover:text-primary1-light focus:text-primary1-light"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </a>
        )}
        {email && (
          <a
            className="text-primary1 table underline hover:text-primary1-light focus:text-primary1-light"
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {email}
          </a>
        )}
        {phone && (
          <a
            className="text-primary1 table hover:text-primary1-light focus:text-primary1-light"
            href={`tel:${phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {phone}
          </a>
        )}

        {description && (
          <div className="flex flex-col desktop:flex-row desktop:items-end mt-4">
            <div className={cn('content-WYSIWYG', truncateState === 'TRUNCATE' && 'line-clamp-2')}>
              <div>{parse(description)}</div>
            </div>
            <span
              className="text-primary1 underline cursor-pointer shrink-0 desktop:ml-1"
              onClick={toggleTruncateState}
            >
              <FormattedMessage
                id={truncateState === 'TRUNCATE' ? 'details.knowMore' : 'details.close'}
              />
            </span>
          </div>
        )}

        {accessibility && (
          <div className="mt-5">
            <strong className="font-bold">
              <FormattedMessage id="details.accessibility" /> :{' '}
            </strong>
            <div className="content-WYSIWYG">{parse(accessibility)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const InformationDeskIcon: React.FC<{ pictogramUri: string }> = ({ pictogramUri }) => {
  if (RegExp(/(.*).svg/).test(pictogramUri)) {
    return <SVG src={pictogramUri} className="size-full m-1" preProcessor={optimizeSVG} />;
  }
  return (
    <Image
      loading="lazy"
      className="object-cover size-full rounded-full overflow-hidden"
      src={pictogramUri}
      alt=""
      width={100}
      height={100}
    />
  );
};
