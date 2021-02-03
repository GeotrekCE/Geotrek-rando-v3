import SVG from 'react-inlinesvg';
import parse from 'html-react-parser';
import { HtmlText } from 'components/pages/details/utils';
import { Label } from 'modules/label/interface';
import { AlertTriangle } from 'components/Icons/AlertTriangle';

interface DetailsLabelProps extends Label {
  className?: string;
}

export const DetailsLabel: React.FC<DetailsLabelProps> = ({
  className,
  name,
  advice,
  pictogramUri,
}) => {
  return (
    <div
      className={`py-4 desktop:py-5 px-3 desktop:px-4 flex items-start text-warning
      rounded-2xl border-2 border-solid border-warning
      ${className ?? ''}`}
    >
      <div className="mr-2 desktop:mr-4 flex-shrink-0">
        {pictogramUri !== null ? (
          <LabelIcon pictogramUri={pictogramUri} />
        ) : (
          <div className="w-6 h-6 desktop:h-12 desktop:w-12">
            <AlertTriangle />
          </div>
        )}
      </div>
      <div className="text-greyDarkColored text-Mobile-C2 desktop:text-P1 desktop:font-bold">
        <HtmlText>{parse(name)}</HtmlText>
        <br className="hidden desktop:block" />
        <HtmlText>{parse(advice)}</HtmlText>
      </div>
    </div>
  );
};

const LabelIcon: React.FC<{ pictogramUri: string }> = ({ pictogramUri }) => {
  if (RegExp(/(.*).svg/).test(pictogramUri)) {
    return <SVG src={pictogramUri} className="w-6 desktop:w-10" />;
  }
  return (
    <img
      className="object-center object-cover w-6 h-6 desktop:h-10 desktop:w-10 rounded-full"
      src={pictogramUri}
    />
  );
};
