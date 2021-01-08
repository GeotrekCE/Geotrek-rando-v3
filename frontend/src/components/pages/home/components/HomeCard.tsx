import styled, { css } from 'styled-components';
import { desktopOnly } from 'stylesheet';
import { Chip } from 'components/Chip';

interface Props {
  title: string;
  imagePath: string;
  subtitle: string;
  tag: string;
  heightMobile: number;
  heightDesktop: number;
}

const HomeCard: React.FC<Props> = ({
  title,
  imagePath,
  subtitle,
  tag,
  heightMobile,
  heightDesktop,
}) => {
  const ImageContainer = styled.div`
    background-image: url(${imagePath});
    background-size: cover;
    background-position: center;
    height: ${heightMobile}px;
    ${desktopOnly(
      css`
        height: ${heightDesktop}px;
      `,
    )}
  `;
  return (
    <ImageContainer className="flex flex-col h-65 bg-primary1 rounded-2xl p-4 justify-between items-start">
      <Chip>{tag}</Chip>
      <div className="text-white">
        <p className="font-bold text-xl">{title}</p>
        <p>{subtitle}</p>
      </div>
    </ImageContainer>
  );
};

export default HomeCard;
