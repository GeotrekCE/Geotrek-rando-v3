import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
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
    <div className={`flex flex-col`}>
      <div className="flex border-t border-greySoft border-solid pt-4 desktop:pt-10 mb-2 desktop:mb-6 mx-4 desktop:mx-10percent">
        <SVG
          src={iconUrl}
          preProcessor={fillSvgWithColor(colorPalette.greyDarkColored)}
          className="h-10 mr-2 desktop:mr-3"
        />
        <span className="mt-1 desktop:mt-0 text-H4 desktop:text-H2 font-bold">{title}</span>
      </div>
      <ScrollContainer
        className="flex desktop:flex-wrap overflow-x-auto overflow-y-hidden desktop:overflow-hidden
        mb-5 desktop:mb-15 desktop:justify-center px-4 desktop:px-10percent"
      >
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
      </ScrollContainer>
    </div>
  );
};

const ScrollContainer = styled.div`
  &::-webkit-scrollbar {
    height: 0;
  }
  &::-webkit-scrollbar-thumb {
    opacity: 0;
  }
  max-width: 100%;
`;
