import parse from 'html-react-parser';
import { BackPack } from 'components/Icons/BackPack';
import { cn } from 'services/utils/cn';
import { HTMLAttributes } from 'react';

interface DetailsGearProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

export const DetailsGear: React.FC<DetailsGearProps> = ({ className, text }) => {
  return (
    <div
      id="details_recommandationGear"
      className={cn(
        'py-4 desktop:py-5 px-3 desktop:px-4 gap-2 desktop:gap-4 flex justify-start items-center rounded-2xl border-2 border-solid border-greyDarkColored',
        className,
      )}
    >
      <BackPack className="shrink-0 size-6 desktop:size-12" aria-hidden />
      <div className="text-greyDarkColored desktop:font-bold text-Mobile-C2 desktop:text-P1">
        <div className="content-WYSIWYG">{parse(text)}</div>
      </div>
    </div>
  );
};
