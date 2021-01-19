import { ActivityChoices } from 'modules/activities/interface';
import { Details, RawDetails } from './interface';

export const adaptResults = ({
  rawDetails,
  activities,
}: {
  rawDetails: RawDetails;
  activities: ActivityChoices;
}): Details => ({
  title: rawDetails.name,
  place: rawDetails.departure,
  imgUrl: rawDetails.thumbnail.url,
  practice: activities[rawDetails.practice],
});
