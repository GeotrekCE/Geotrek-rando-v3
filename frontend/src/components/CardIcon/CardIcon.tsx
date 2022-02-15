import { colorPalette, fillSvgWithColor } from 'stylesheet';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

const Wrapper = styled.div``;

export const CardIcon: React.FC<{ iconUri: string; color?: string }> = ({ iconUri, color }) => {
  const classNameContainer =
    'absolute top-4 left-4 h-8 w-8 rounded-full shadow-sm text-white border-2 border-white border-solid';

  if (RegExp(/(.*).svg/).test(iconUri)) {
    return (
      <Wrapper className={classNameContainer} style={{ background: color }}>
        <SVG
          src={iconUri}
          className="fill-current h-full w-full p-1"
          preProcessor={fillSvgWithColor(colorPalette.white)}
        />
      </Wrapper>
    );
  }
  return <img className={`object-cover object-center ${classNameContainer}`} src={iconUri} />;
};
