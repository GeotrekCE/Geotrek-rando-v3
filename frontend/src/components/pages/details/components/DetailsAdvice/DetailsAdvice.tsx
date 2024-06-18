import parse from 'html-react-parser';
import { HtmlText } from 'components/pages/details/utils';
import { AlertTriangle } from 'components/Icons/AlertTriangle';

interface DetailsAdviceProps {
  className?: string;
  text: string;
}

export const DetailsAdvice: React.FC<DetailsAdviceProps> = ({ className, text }) => {
  return (
    <div
      id="details_recommandationAdvice"
      className={`py-4 desktop:py-5 px-3 desktop:px-4 flex
      rounded-2xl border-2 border-solid border-greyDarkColored
      ${className ?? ''}`}
    >
      <div className="mr-2 desktop:mr-4 shrink-0 size-6 desktop:size-12 self-start">
        <AlertTriangle />
      </div>
      <div className="text-greyDarkColored desktop:font-bold text-Mobile-C2 desktop:text-P1 my-auto">
        <HtmlText>{parse(text)}</HtmlText>
      </div>
    </div>
  );
};
