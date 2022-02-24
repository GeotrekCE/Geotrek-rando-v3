import { colorPalette, fillSvgWithColor } from 'stylesheet';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

const Wrapper = styled.div<{ color?: string }>`
  width: auto;
  display: flex;
  z-index: 100;
  background: ${props => props.color};

  & > div {
    max-width: 0;
    overflow: hidden;
    transition: max-width 1s;
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
  margin-top: 2px;

  & > div {
    padding: 0 10px;
  }
`;

const StyledSVG = styled(SVG)`
  height: 28px;
  width: 28px;
`;

export const CardIcon: React.FC<{ iconUri: string; iconName: string; color?: string }> = ({
  iconUri,
  iconName,
  color,
}) => {
  const classNameContainer =
    'absolute top-4 left-4 h-8 w-8 rounded-full shadow-sm text-white border-2 border-white border-solid';
  if (RegExp(/(.*).svg/).test(iconUri)) {
    return (
      <Wrapper className={classNameContainer} color={color}>
        <StyledSVG
          src={iconUri}
          className="fill-current p-1"
          preProcessor={fillSvgWithColor(colorPalette.white)}
        />
        <Label>
          <div>{iconName}</div>
        </Label>
      </Wrapper>
    );
  }
  return <img className={`object-cover object-center ${classNameContainer}`} src={iconUri} />;
};
