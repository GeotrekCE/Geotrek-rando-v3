import SVG from 'react-inlinesvg';
import parse from 'html-react-parser';
import { HtmlText } from 'components/pages/details/utils';
import { Label } from 'modules/label/interface';
import { AlertTriangle } from 'components/Icons/AlertTriangle';
import Image from 'next/image';
import { optimizeSVG } from 'stylesheet';

interface DetailsLabelProps extends Label {
  className?: string;
}

export const DetailsLabel: React.FC<DetailsLabelProps> = ({
  className = '',
  name,
  advice,
  pictogramUri,
}) => {
  if (!name) return null;

  return (
    <div
      id="details_recommandationLabel"
      className={`py-4 desktop:py-5 px-3 desktop:px-4 flex items-start text-warning
      rounded-2xl border-2 border-solid border-warning
      ${className}`}
    >
      <div className="mr-2 desktop:mr-3 shrink-0 size-6 desktop:size-12">
        {pictogramUri !== null ? <LabelIcon pictogramUri={pictogramUri} /> : <AlertTriangle />}
      </div>
      <div className="text-greyDarkColored text-Mobile-C2 desktop:text-P1">
        <div className="text-P1 desktop:text-H4 text-warning font-bold">
          <HtmlText>{parse(name)}</HtmlText>
        </div>
        {advice && <HtmlText>{parse(advice)}</HtmlText>}
      </div>
    </div>
  );
};

const LabelIcon: React.FC<{ pictogramUri: string }> = ({ pictogramUri }) => {
  if (RegExp(/(.*).svg/).test(pictogramUri)) {
    return <SVG src={pictogramUri} className="size-6 desktop:size-10" preProcessor={optimizeSVG} />;
  }
  return (
    <Image
      loading="lazy"
      className="object-center object-cover size-6 desktop:size-10 rounded-full"
      src={pictogramUri}
      width={24}
      height={24}
      alt=""
    />
  );
};
