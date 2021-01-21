import { Activity } from 'modules/activities/interface';
import { Choices } from 'modules/filters/interface';
import { dataUnits } from 'modules/results/adapter';
import { Difficulty } from 'modules/filters/difficulties/interface';
import { formatDistance } from 'modules/results/utils';
import { Details, RawDetails } from './interface';

export const adaptResults = ({
  rawDetails,
  activity,
}: {
  rawDetails: RawDetails;
  activity: Activity;
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
  };
};
