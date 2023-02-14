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
  return (
    <div
      id="details_description"
      className={`flex flex-col
      pt-6 desktop:pt-12
      border-solid border-greySoft border-b
      ${className ?? ''}`}
    >
      <h2 id="details_descriptionTitle" className="text-Mobile-H1 desktop:text-H2 font-bold">
        {title}
      </h2>
      <div id="details_descriptionContent" className="mt-3 desktop:mt-4 mb-6 desktop:mb-12">
        <StyledListWithSteps>{parse(descriptionHtml)}</StyledListWithSteps>
      </div>

      {departure && (
        <div>
          <span className={'font-bold'}>
            <FormattedMessage id="details.departure" />
          </span>{' '}
          : {departure}
        </div>
      )}
      {arrival && (
        <div>
          <span className={'font-bold'}>
            <FormattedMessage id="details.arrival" />
          </span>{' '}
          : {arrival}
        </div>
      )}
      {cities && cities.length > 0 && (
        <div>
          <span className={'font-bold'}>
            <FormattedMessage id="details.cities" />
          </span>{' '}
          : {cities.join(', ')}
        </div>
      )}

      {Boolean(email) && (
        <div>
          <a href={`mailto:${email as string}`} className="underline">
            {email}
          </a>
        </div>
      )}
      {Boolean(website) && (
        <div>
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        </div>
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
