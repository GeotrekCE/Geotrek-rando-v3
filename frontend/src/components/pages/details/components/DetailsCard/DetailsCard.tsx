import { ActivityBadge } from 'components/pages/search/components/ResultCard/ActivityBadge';
import { textEllipsisAfterNLines } from 'services/cssHelpers';
import parse from 'html-react-parser';
import { HtmlText } from 'components/pages/details/utils';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useDetailsCard } from './useDetailsCard';

export interface DetailsCardProps {
  name: string;
  description?: string;
  thumbnailUri?: string;
  iconUri?: string;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  name,
  description,
  thumbnailUri,
  iconUri,
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
      className="mx-1
      w-60 desktop:w-auto
      flex-none
      border-greySoft border border-solid
      rounded-2xl overflow-hidden
      flex flex-col desktop:flex-row
      desktop:mb-6
      hover:shadow-sm transition-all"
    >
      <div className="relative flex-none desktop:w-2/5">
        <img
          src={thumbnailUri}
          className="h-50 w-60 desktop:w-full desktop:h-full
          object-cover object-center
           bg-greySoft"
        />
        {iconUri !== null && iconUri !== undefined && (
          <img
            className="absolute top-4 left-4 h-8 w-8 rounded-full shadow-sm object-cover object-center"
            src={'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-fauna.png'}
          />
        )}
      </div>
      <div
        className={`flex flex-col
        p-2 desktop:pl-6 desktop:pr-8 ${
          truncateState === 'TRUNCATE' ? 'desktop:py-15' : 'desktop:py-6'
        }`}
      >
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

const TruncatedHtmlText = styled(HtmlText)`
  ${textEllipsisAfterNLines(2)}
`;
