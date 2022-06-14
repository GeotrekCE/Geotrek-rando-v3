import { CardIcon } from 'components/CardIcon';
import { SmallCarousel } from 'components/Carousel';
import styled, { css } from 'styled-components';
import getActivityColor from '../getActivityColor';

interface ResultCardCarouselProps {
  type: 'TREK' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_CONTENT' | 'TOURISTIC_EVENT';
  thumbnailUris: string[];
  iconUri?: string;
  iconName: string;
  onClickImage?: () => void;
  asColumn?: boolean;
}

export const ResultCardCarousel: React.FC<ResultCardCarouselProps> = ({
  type,
  thumbnailUris,
  iconUri,
  iconName,
  onClickImage,
  asColumn,
}) => {
  const files =
    typeof navigator !== 'undefined' && navigator?.onLine
      ? thumbnailUris
      : thumbnailUris.slice(0, 1);

  return (
    <Wrapper
      className={`h-full w-full flex-shrink-0 relative desktop:w-resultCardDesktop`}
      asColumn={asColumn}
    >
      <SmallCarousel>
        {files.map((thumbnailUri, i) => (
          <div key={i} className="relative h-full" onClick={onClickImage}>
            <img src={thumbnailUri} className="object-cover object-top w-full h-full" alt="" />
          </div>
        ))}
      </SmallCarousel>
      <CardIcon iconUri={iconUri} iconName={iconName} color={getActivityColor(type)} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ asColumn?: boolean }>`
    ${({ asColumn }) =>
      asColumn === true &&
      css`
        width: 100%;
      `}
  }
`;
