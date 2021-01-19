import { Activity } from 'modules/activities/interface';
import { Details, RawDetails } from './interface';

export const adaptResults = ({
  rawDetails,
  activity,
}: {
  rawDetails: RawDetails;
  activity: Activity;
}): Details => ({
  title: rawDetails.name,
  place: rawDetails.departure,
  imgUrl: rawDetails.thumbnail.url,
  practice: activity,
  transport: rawDetails.public_transport,
  access_parking: rawDetails.access + ' -- ' + rawDetails.advised_parking,
});
