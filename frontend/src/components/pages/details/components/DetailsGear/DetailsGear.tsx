import parse from 'html-react-parser';
import { BackPack } from 'components/Icons/BackPack';

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
      <div className="mr-2 desktop:mr-4 shrink-0 size-6 desktop:size-12 self-start">
        <BackPack />
      </div>
      <div className="text-greyDarkColored desktop:font-bold text-Mobile-C2 desktop:text-P1 my-auto">
        <div className="content-WYSIWYG">{parse(text)}</div>
      </div>
    </div>
  );
};
