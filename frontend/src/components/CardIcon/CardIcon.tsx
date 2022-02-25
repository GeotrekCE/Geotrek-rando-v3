import { colorPalette, fillSvgWithColor } from 'stylesheet';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

const Wrapper = styled.div<{ color?: string }>`
  z-index: 100;
  background: ${props => props.color};

  & > div {
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
    transition: max-width 0.6s;
  }

  &:hover {
    & > div {
      max-width: 150px;
    }
  }
`;

const Label = styled.div`
  text-align: center;
  flex: auto;

  & > div {
    padding: 0 10px;
  }
`;

const StyledSVG = styled(SVG)`
  height: 28px;
  width: 28px;
`;

const Img = styled.img`
  height: 28px;
  width: 28px;
  border-radius: 50%;
`;

export const CardIcon: React.FC<{ iconUri: string; iconName: string; color?: string }> = ({
  iconUri,
  iconName,
  color,
}) => {
  return (
    <Wrapper
      className="absolute top-4 left-4 h-8 flex items-center w-auto rounded-full shadow-sm text-white border-2 border-white border-solid"
      color={color}
    >
      {RegExp(/(.*).svg/).test(iconUri) ? (
        <StyledSVG
          src={iconUri}
          className="fill-current p-1"
          preProcessor={fillSvgWithColor(colorPalette.white)}
        />
      ) : (
        <Img src={iconUri} alt="" />
      )}
      <Label>
        <div>{iconName}</div>
      </Label>
    </Wrapper>
  );
};
