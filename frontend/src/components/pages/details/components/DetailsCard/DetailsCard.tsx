import { textEllipsisAfterNLines } from 'services/cssHelpers';
import parse from 'html-react-parser';
import { HtmlText } from 'components/pages/details/utils';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { useDetailsCard } from './useDetailsCard';
export interface DetailsCardProps {
  name: string;
  place?: string;
  description?: string;
  thumbnailUri: string | null;
  iconUri?: string;
  logoUri?: string;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  name,
  description,
  thumbnailUri,
  iconUri,
  place,
  logoUri,
}) => {
  const { truncateState, toggleTruncateState } = useDetailsCard();
  const descriptionStyled =
    truncateState === 'TRUNCATE' ? (
      <TruncatedHtmlText>{parse(description ?? '')}</TruncatedHtmlText>
    ) : (
      <HtmlText>{parse(description ?? '')}</HtmlText>
    );
  return (
    <div
      className={`mx-1
      w-60 desktop:w-auto
      flex-none
      border-greySoft border border-solid
      rounded-2xl overflow-hidden
      flex flex-col desktop:flex-row
      desktop:mb-6
      hover:shadow-sm transition-all
      relative
      ${truncateState === 'TRUNCATE' ? 'desktop:h-50' : ''}
      `}
    >
      {logoUri !== undefined && (
        <img
          className="hidden desktop:absolute h-12 object-cover object-center right-6 top-6"
          src={logoUri}
        />
      )}
      <div className="flex-none desktop:w-2/5">
        {thumbnailUri !== null ? (
          <img
            src={thumbnailUri}
            className="h-50 w-60 desktop:w-full desktop:h-full
          object-cover object-center
           bg-greySoft"
          />
        ) : (
          <div
            className="h-50 w-60 desktop:w-full desktop:h-full
         bg-greySoft"
          />
        )}
        {iconUri !== null && iconUri !== undefined && <CardIcon iconUri={iconUri} />}
      </div>
      <div
        className={`flex flex-col relative
        p-2 desktop:p-6 desktop:my-auto`}
      >
        {place !== undefined && <p>{place}</p>}
        <p className="text-Mobile-C1 desktop:text-H4 text-primary1 font-bold">{name}</p>
        {description !== undefined && (
          <div
            className="mt-1 desktop:mt-4
            flex flex-col desktop:flex-row desktop:items-end
            text-Mobile-C2 desktop:text-P1"
          >
            {descriptionStyled}
            <span
              className="text-primary1 underline cursor-pointer flex-shrink-0 desktop:ml-1"
              onClick={toggleTruncateState}
            >
              <FormattedMessage
                id={truncateState === 'TRUNCATE' ? 'details.readMore' : 'details.readLess'}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const CardIcon: React.FC<{ iconUri: string }> = ({ iconUri }) => {
  const classNameContainer =
    'absolute top-4 left-4 h-8 w-8 rounded-full shadow-sm text-white bg-primary1 border-2 border-white border-solid';
  if (RegExp(/(.*).svg/).test(iconUri)) {
    return (
      <div className={classNameContainer}>
        <SVG
          src={iconUri}
          className="fill-current h-full w-full p-1"
          preProcessor={fillSvgWithColor(colorPalette.white)}
        />
      </div>
    );
  }
  return <img className={`object-cover object-center ${classNameContainer}`} src={iconUri} />;
};

const TruncatedHtmlText = styled(HtmlText)`
  ${textEllipsisAfterNLines(2)}
`;
