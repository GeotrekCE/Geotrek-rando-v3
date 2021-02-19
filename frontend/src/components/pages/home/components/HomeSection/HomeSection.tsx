import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { ActivitySuggestionCard } from '../ActivitySuggestionCard';

export interface HomeSectionProps {
  title: string;
  iconUrl: string;
  activitySuggestions?: ActivitySuggestion[];
  className?: string;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  iconUrl,
  activitySuggestions,
  className,
}) => {
  return (
    <div className={`flex flex-col ${className ?? ''}`}>
      <div className="flex border-t border-greySoft border-solid pt-3 desktop:pt-10 mb-3 desktop:mb-6">
        <SVG
          src={iconUrl}
          preProcessor={fillSvgWithColor(colorPalette.greyDarkColored)}
          className="h-10 mr-2 desktop:mr-3"
        />
        <span className="text-H4 desktop:text-H2 font-bold">{title}</span>
      </div>
      <div className="flex flex-wrap overflow-hidden mb-5 desktop:mb-15 justify-center">
        {activitySuggestions !== undefined &&
          activitySuggestions.map((activitySuggestion, i) => (
            <ActivitySuggestionCard
              key={i}
              id={activitySuggestion.id}
              title={activitySuggestion.title}
              imgUrl={activitySuggestion.imgUrl}
              className="m-1 desktop:m-2"
            />
          ))}
      </div>
    </div>
  );
};
