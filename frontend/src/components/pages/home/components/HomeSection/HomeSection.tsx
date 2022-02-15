import {
  generateOutdoorSiteUrl,
  generateTouristicContentUrl,
  generateTouristicEventUrl,
} from 'components/pages/details/utils';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import {
  isOutdoorSite,
  isTouristicContent,
  isTouristicEvent,
  isTrek,
} from 'components/pages/search/Search';
import { generateResultDetailsUrl, getHoverId } from 'components/pages/search/utils';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { ActivitySuggestionCard } from '../ActivitySuggestionCard';

export interface HomeSectionProps {
  title: string;
  iconUrl: string;
  results: ActivitySuggestion['results'];
  type: string;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ title, iconUrl, results, type }) => {
  return (
    <div id={'home_section'} className={`flex flex-col`}>
      <div
        id="home_sectionTitle"
        className="flex border-t border-greySoft border-solid pt-4 desktop:pt-10 mb-2 desktop:mb-6 mx-4 desktop:mx-10percent"
      >
        <SVG
          src={iconUrl}
          preProcessor={fillSvgWithColor(colorPalette.greyDarkColored)}
          className="h-10 mr-2 desktop:mr-3"
        />
        <span className="mt-1 desktop:mt-0 text-H4 desktop:text-H2 font-bold">{title}</span>
      </div>
      <ScrollContainer
        id="home_sectionContent"
        className="flex desktop:flex-wrap overflow-x-auto overflow-y-hidden desktop:overflow-hidden
        mb-5 desktop:mb-15 desktop:justify-center px-4 desktop:px-10percent"
      >
        {results !== undefined &&
          results.map((e: any, i) => {
            if (type === 'trek')
              return (
                <ResultCard
                  type={e.type}
                  key={e.title}
                  id={`${e.id}`}
                  hoverId={getHoverId(e)}
                  place={e.place}
                  title={e.title}
                  tags={e.tags}
                  thumbnailUris={e.thumbnailUris}
                  attachments={e.attachments}
                  badgeIconUri={e.practice?.pictogram}
                  informations={e.informations}
                  redirectionUrl={generateResultDetailsUrl(e.id, e.title)}
                  className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
                />
              );
            else if (type === 'service')
              return (
                <ResultCard
                  type={e.type}
                  key={e.name}
                  id={`${e.id}`}
                  hoverId={getHoverId(e)}
                  place={e.place}
                  title={e.name}
                  tags={e.themes}
                  thumbnailUris={e.thumbnailUris}
                  attachments={e.attachments}
                  badgeIconUri={e.category.pictogramUri}
                  informations={e.types}
                  redirectionUrl={generateTouristicContentUrl(e.id, e.name)}
                  className="my-4 desktop:my-6 desktop:mx-1 desktop:max-h-50" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                />
              );
            else if (type === 'outdoor')
              return (
                <ResultCard
                  type={e.type}
                  key={e.name}
                  id={`${e.id}`}
                  hoverId={getHoverId(e)}
                  place={e.place}
                  title={e.name}
                  tags={e.themes}
                  thumbnailUris={e.thumbnailUris}
                  attachments={e.attachments}
                  badgeIconUri={e.practice?.pictogram}
                  informations={[]}
                  redirectionUrl={generateOutdoorSiteUrl(e.id, e.name)}
                  className="my-4 desktop:my-6 desktop:mx-1 desktop:max-h-50" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                />
              );
            else if (type === 'events')
              return (
                <ResultCard
                  type={e.type}
                  key={e.name}
                  id={`https://formatjs.io/docs/react-intl/api#formatdate${e.id}`}
                  hoverId={getHoverId(e)}
                  place={e.place}
                  title={e.name}
                  tags={e.themes}
                  thumbnailUris={e.thumbnailUris}
                  attachments={e.attachments}
                  badgeIconUri={e.typeEvent?.pictogram}
                  informations={{
                    date: {
                      beginDate: e.beginDate,
                      endDate: e.endDate,
                    },
                  }}
                  redirectionUrl={generateTouristicEventUrl(e.id, e.name)}
                  className="my-4 desktop:my-6 desktop:mx-1 desktop:max-h-50" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                />
              );
          })}
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
