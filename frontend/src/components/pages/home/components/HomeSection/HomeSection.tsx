import {
  generateOutdoorSiteUrl,
  generateTouristicContentUrl,
  generateTouristicEventUrl,
} from 'components/pages/details/utils';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import { generateResultDetailsUrl, getHoverId } from 'components/pages/search/utils';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { colorPalette, fillSvgWithColor } from 'stylesheet';

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
        <span className="mt-1 desktop:mt-0 text-H2 desktop:text-H2 font-bold">{title}</span>
      </div>
      <ScrollContainer>
        {results !== undefined &&
          // eslint-disable-next-line
          results.map((e: any) => {
            if (type === 'trek')
              return (
                <ResultCard
                  asColumn
                  type={e.type}
                  key={e.title}
                  id={e.id}
                  hoverId={getHoverId(e)}
                  place={e.place}
                  title={e.title}
                  tags={e.tags}
                  thumbnailUris={e.thumbnailUris.slice(0, 1)}
                  attachments={e.attachments.slice(0, 1)}
                  badgeIconUri={e.practice?.pictogram}
                  badgeName={e.practice?.name}
                  informations={e.informations}
                  redirectionUrl={generateResultDetailsUrl(e.id, e.title)}
                  className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
                />
              );
            else if (type === 'service')
              return (
                <ResultCard
                  asColumn
                  type={e.type}
                  key={e.name}
                  id={e.id}
                  hoverId={getHoverId(e)}
                  place={e.place}
                  title={e.name}
                  tags={e.themes}
                  thumbnailUris={e.thumbnailUris.slice(0, 1)}
                  attachments={e.attachments.slice(0, 1)}
                  badgeIconUri={e.category.pictogramUri}
                  badgeName={e.category?.label}
                  informations={e.types}
                  redirectionUrl={generateTouristicContentUrl(e.id, e.name)}
                  className="my-4 desktop:my-6 desktop:mx-1" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                />
              );
            else if (type === 'outdoor')
              return (
                <ResultCard
                  asColumn
                  type={e.type}
                  key={e.name}
                  id={e.id}
                  hoverId={getHoverId(e)}
                  place={e.place}
                  title={e.name}
                  tags={e.themes}
                  thumbnailUris={e.thumbnailUris.slice(0, 1)}
                  attachments={e.attachments.slice(0, 1)}
                  badgeIconUri={e.practice?.pictogram}
                  badgeName={e.practice?.name}
                  informations={[]}
                  redirectionUrl={generateOutdoorSiteUrl(e.id, e.name)}
                  className="my-4 desktop:my-6 desktop:mx-1" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                />
              );
            else if (type === 'events')
              return (
                <ResultCard
                  asColumn
                  type={e.type}
                  key={e.name}
                  id={`https://formatjs.io/docs/react-intl/api#formatdate${e.id as string}`}
                  hoverId={getHoverId(e)}
                  place={e.place}
                  title={e.name}
                  tags={e.themes}
                  thumbnailUris={e.thumbnailUris.slice(0, 1)}
                  attachments={e.attachments.slice(0, 1)}
                  badgeIconUri={e.typeEvent?.pictogram}
                  badgeName={e.typeEvent?.type}
                  informations={{
                    date: {
                      beginDate: e.beginDate,
                      endDate: e.endDate,
                    },
                  }}
                  redirectionUrl={generateTouristicEventUrl(e.id, e.name)}
                  className="my-4 desktop:my-6 desktop:mx-1" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                />
              );
          })}
      </ScrollContainer>
    </div>
  );
};

const ScrollContainer = styled.div`
  display: flex;
  padding: 20px;

  @media (min-width: 1024px) {
    margin-left: 10%;
    margin-right: 10%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }

  @media (max-width: 1024px) {
    overflow: scroll;

    & > * {
      flex: auto;
      max-width: 300px;
      min-width: 300px;
      margin-right: 20px;
    }
  }
`;
