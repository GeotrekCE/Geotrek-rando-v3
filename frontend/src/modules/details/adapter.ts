import { Activity } from 'modules/activities/interface';
import { Choices } from 'modules/filters/interface';
import { dataUnits } from 'modules/results/adapter';
import { Difficulty } from 'modules/filters/difficulties/interface';
import { formatDistance } from 'modules/results/utils';
import { CourseType } from 'modules/filters/courseType/interface';
import { Details, RawDetails } from './interface';

export const adaptResults = ({
  rawDetails,
  activity,
  difficulty,
  courseType,
  themes,
}: {
  rawDetails: RawDetails;
  activity: Activity;
  difficulty: Difficulty | null;
  courseType: CourseType | null;
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
    tags: rawDetails.themes.map(themeId => themes[themeId].label),
    informations: {
      duration: rawDetails.duration !== null ? `${rawDetails.duration}${dataUnits.time}` : null,
      distance: `${formatDistance(rawDetails.length_2d)}`,
      elevation: `+${rawDetails.ascent}${dataUnits.distance}`,
      difficulty,
      courseType,
    },
  };
};
