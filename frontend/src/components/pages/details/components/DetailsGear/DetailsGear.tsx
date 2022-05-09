import parse from 'html-react-parser';
import { HtmlText } from 'components/pages/details/utils';

interface DetailsGearProps {
  className?: string;
  text: string;
}

export const DetailsGear: React.FC<DetailsGearProps> = ({ className, text }) => {
  return (
    <div
      id="details_recommandationGear"
      className={`py-4 desktop:py-5 px-3 desktop:px-4 flex
      rounded-2xl border-2 border-solid border-greyDarkColored
      ${className ?? ''}`}
    >
      <div className="text-greyDarkColored desktop:font-bold text-Mobile-C2 desktop:text-P1 my-auto">
        <HtmlText>{parse(text)}</HtmlText>
      </div>
    </div>
  );
};
