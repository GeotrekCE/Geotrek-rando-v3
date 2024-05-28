import { FormattedMessage, useIntl } from 'react-intl';
import parse from 'html-react-parser';
import { cn } from 'services/utils/cn';

interface DetailsDescriptionProps {
  id?: string;
  descriptionHtml: string;
  className?: string;
  departure?: string | null;
  arrival?: string | null;
  cities?: string[];
  title?: React.ReactElement;
  email?: string;
  website?: string;
}

export const DetailsDescription: React.FC<DetailsDescriptionProps> = ({
  id = 'details_description',
  descriptionHtml,
  className,
  departure,
  arrival,
  cities,
  title = <FormattedMessage id="details.description" />,
  email,
  website,
}) => {
  const hasDeparture = typeof departure === 'string' && departure.length > 0;
  const hasArrival = typeof arrival === 'string' && arrival.length > 0;
  const hasCities = Array.isArray(cities) && cities.length > 0;
  const hasEmail = Boolean(email);
  const hasWebsite = Boolean(website);
  const intl = useIntl();

  return (
    <div
      id={id}
      className={cn(
        'flex flex-col py-6 desktop:py-12 border-solid border-greySoft border-b scroll-mt-20 desktop:scroll-mt-30',
        className,
      )}
    >
      <h2 id={`${id}Title`} className="text-Mobile-H1 desktop:text-H2 font-bold">
        {title}
      </h2>
      <div id={`${id}Content`} className="mt-3 desktop:mt-4">
        <div
          className={cn(
            'content-WYSIWYG',
            '[&>ol]:my-2 desktop:[&>ol]:my-4 [&>ol]:ml-3',
            '[&>ol]:border-l-3 [&>ol]:border-primary3',
            '[&>ol>li]:relative [&>ol>li]:pl-12 [&>ol>li]:-ml-4 [&>ol>li]:mt-4 first:[&>ol>li]:mt-0 desktop:[&>ol>li]:mt-10 [&>ol>li]:[counter-increment:steps]',
            'before:[&>ol>li]:absolute before:[&>ol>li]:left-0 before:[&>ol>li]:top-1/2 before:[&>ol>li]:-translate-y-1/2',
            'before:[&>ol>li]:mr-4 desktop:before:[&>ol>li]:mr-6',
            'before:[&>ol>li]:content-[counter(steps)] before:[&>ol>li]:rounded-full before:[&>ol>li]:size-7',
            'before:[&>ol>li]:flex before:[&>ol>li]:items-center before:[&>ol>li]:justify-center',
            'before:[&>ol>li]:text-sm before:[&>ol>li]:text-white before:[&>ol>li]:bg-redMarker',
            'before:[&>ol>li]:shadow-md',
          )}
        >
          {parse(descriptionHtml)}
        </div>
      </div>

      {(hasDeparture || hasArrival || hasCities || hasCities || hasEmail || hasWebsite) && (
        <ul className="mt-3 desktop:mt-4">
          {hasDeparture && (
            <li>
              <span className={'font-bold'}>
                <FormattedMessage id="details.departure" />
              </span>{' '}
              : {departure}
            </li>
          )}
          {hasArrival && (
            <li>
              <span className={'font-bold'}>
                <FormattedMessage id="details.arrival" />
              </span>{' '}
              : {arrival}
            </li>
          )}
          {hasCities && (
            <li>
              <span className={'font-bold'}>
                <FormattedMessage id="details.cities" />
              </span>{' '}
              : {intl.formatList(cities, { type: 'conjunction' })}
            </li>
          )}

          {hasEmail && (
            <li>
              <a href={`mailto:${email as string}`} className="underline break-words">
                {email}
              </a>
            </li>
          )}
          {hasWebsite && (
            <li>
              <a
                href={website}
                className="underline break-words"
                target="_blank"
                rel="noopener noreferrer"
              >
                {website}
              </a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
