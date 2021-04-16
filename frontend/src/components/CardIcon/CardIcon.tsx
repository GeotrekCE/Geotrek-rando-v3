import { colorPalette, fillSvgWithColor } from 'stylesheet';
import SVG from 'react-inlinesvg';

export const CardIcon: React.FC<{ iconUri: string }> = ({ iconUri }) => {
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
