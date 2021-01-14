import styled from 'styled-components';
import { colorPalette, MAX_WIDTH_MOBILE } from 'stylesheet';
import { Chip } from 'components/Chip';

interface ImageContainerProps {
  imagePath: string;
  heightMobile: number;
  heightDesktop: number;
}
interface HomeCardProps extends ImageContainerProps {
  title: string;
  subtitle: string;
  tag: string;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  imagePath,
  subtitle,
  tag,
  heightMobile,
  heightDesktop,
}) => {
  return (
    <ImageContainer
      className="flex flex-col h-65 bg-primary1 rounded-2xl p-4 justify-between items-start desktop:p-10"
      imagePath={imagePath}
      heightMobile={heightMobile}
      heightDesktop={heightDesktop}
    >
      <Chip>{tag}</Chip>
      <div className="text-white">
        <p className="font-bold text-Mobile-H1 desktop:text-H2 mb-2">{title}</p>
        <p className="font-bold desktop:text-H4">{subtitle}</p>
      </div>
    </ImageContainer>
  );
};

const ImageContainer = styled.div<ImageContainerProps>`
  background-image: linear-gradient(
      180deg,
      transparent 0%,
      ${colorPalette.home.gradientOnImages} 100%
    ),
    url(${props => props.imagePath});
  background-size: cover;
  background-position: center;
  height: ${props => props.heightMobile}px;
  @media (min-width: ${MAX_WIDTH_MOBILE}px) {
    height: ${props => props.heightDesktop}px;
  }
`;

export default HomeCard;
