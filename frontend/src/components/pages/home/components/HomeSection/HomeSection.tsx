import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { ActivitySuggestionCard } from '../ActivitySuggestionCard';

export interface HomeSectionProps {
  title: string;
  iconUrl: string;
  activitySuggestions?: ActivitySuggestion[];
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  iconUrl,
  activitySuggestions,
}) => {
  return (
    <div
      className="
        border-t border-solid border-greySoft
        pt-3 desktop:pt-18
        flex flex-col space-y-4 desktop:space-y-6"
    >
      <div className="flex items-center space-x-4">
        <SVG
          src={iconUrl}
          preProcessor={fillSvgWithColor(colorPalette.greyDarkColored)}
          className="h-10"
        />
        <span className="text-H4 desktop:text-H2 font-bold">{title}</span>
      </div>
      <div className="flex space-x-6 overflow-hidden">
        {activitySuggestions !== undefined &&
          activitySuggestions.map((activitySuggestion, i) => (
            <ActivitySuggestionCard
              key={i}
              title={activitySuggestion.title}
              imgUrl={activitySuggestion.imgUrl}
            />
          ))}
      </div>
    </div>
  );
};
