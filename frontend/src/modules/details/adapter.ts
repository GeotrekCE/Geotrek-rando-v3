import { Activity } from 'modules/activities/interface';
import { Choices } from 'modules/filters/interface';
import { dataUnits } from 'modules/results/adapter';
import { Difficulty } from 'modules/filters/difficulties/interface';
import { formatDistance } from 'modules/results/utils';
import { CourseType } from 'modules/filters/courseType/interface';
import { NetworkDictionnary } from 'modules/networks/interface';
import { Details, RawDetails } from './interface';

export const adaptResults = ({
  rawDetails,
  activity,
  difficulty,
  courseType,
  networks,
  themes,
}: {
  rawDetails: RawDetails;
  activity: Activity;
  difficulty: Difficulty | null;
  courseType: CourseType | null;
  networks: NetworkDictionnary;
  themes: Choices;
}): Details => {
  return {
    title: rawDetails.name,
    place: rawDetails.departure,
    imgUrl: rawDetails.thumbnail.url,
    practice: activity,
    transport: rawDetails.public_transport,
    access_parking:
      rawDetails.access.length > 0 && rawDetails.advised_parking.length > 0
        ? `${rawDetails.access}\n${rawDetails.advised_parking}`
        : `${rawDetails.access}${rawDetails.advised_parking}`,
    description_teaser: rawDetails.description_teaser,
    description: rawDetails.ambiance,
    description_full: rawDetails.description,
    tags: rawDetails.themes.map(themeId => themes[themeId].label),
    informations: {
      duration: rawDetails.duration !== null ? `${rawDetails.duration}${dataUnits.time}` : null,
      distance: `${formatDistance(rawDetails.length_2d)}`,
      elevation: `+${rawDetails.ascent}${dataUnits.distance}`,
      networks: rawDetails.networks.map(networkId => networks[networkId]),
      difficulty,
      courseType,
    },
  };
};
