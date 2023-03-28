import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing, shadow } from 'stylesheet';
import parse from 'html-react-parser';
import { HtmlText } from '../../utils';

interface DetailsDescriptionProps {
  descriptionHtml: string;
  className?: string;
  departure?: string;
  arrival?: string;
  cities?: string[];
  title?: React.ReactElement;
  email?: string;
  website?: string;
}

export const DetailsDescription: React.FC<DetailsDescriptionProps> = ({
  descriptionHtml,
  className,
  departure,
  arrival,
  cities,
  title = <FormattedMessage id="details.description" />,
  email,
  website,
}) => {
  const hasDeparture = departure !== undefined && departure.length > 0;
  const hasArrival = arrival !== undefined && arrival.length > 0;
  const hasCities = Array.isArray(cities) && cities.length > 0;
  const hasEmail = Boolean(email);
  const hasWebsite = Boolean(website);

  return (
    <div
      id="details_description"
      className={`flex flex-col
      py-6 desktop:py-12
      border-solid border-greySoft border-b
      ${className ?? ''}`}
    >
      <h2 id="details_descriptionTitle" className="text-Mobile-H1 desktop:text-H2 font-bold">
        {title}
      </h2>
      <div id="details_descriptionContent" className="mt-3 desktop:mt-4">
        <StyledListWithSteps>{parse(descriptionHtml)}</StyledListWithSteps>
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
              : {cities.join(', ')}
            </li>
          )}

          {hasEmail && (
            <li>
              <a href={`mailto:${email as string}`} className="underline">
                {email}
              </a>
            </li>
          )}
          {hasWebsite && (
            <li>
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

const StyledListWithSteps = styled(HtmlText)`
  & > ol {
    position: relative;
    list-style: none;
    counter-reset: item;
    margin: ${getSpacing(2)} 0;
    ${desktopOnly(css`
      margin: ${getSpacing(4)} 0;
    `)}
  }
  & > ol::before {
    content: ' ';
    background-color: ${colorPalette.primary3};
    width: 3px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 12px;
    z-index: -1;
  }
  & > ol > li {
    counter-increment: item;
    margin-top: ${getSpacing(4)};
    ${desktopOnly(css`
      margin-top: ${getSpacing(10)};
    `)}
    position: relative;
    padding-left: ${getSpacing(12)};
  }
  & > ol > li:first-child {
    margin-top: 0;
  }
  & > ol > li::before {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    content: counter(item);
    border-radius: 100%;
    width: ${getSpacing(6.5)};
    height: ${getSpacing(6.5)};
    margin-right: ${getSpacing(3.5)};
    color: white;
    background-color: ${colorPalette.redMarker};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${shadow.medium};
    ${desktopOnly(css`
      margin-right: ${getSpacing(5.5)};
    `)}
  }
`;
