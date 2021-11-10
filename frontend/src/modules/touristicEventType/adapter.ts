import { ActivityFilter } from '../activities/interface';
import { EVENT_ID, OUTDOOR_ID } from '../filters/constant';
import { FilterWithoutType } from '../filters/interface';
import { RawTouristicEventType, TouristicEventTypeChoices } from './interface';

export const adaptTouristicEventTypes = ({
  rawTouristicEventTypes,
}: {
  rawTouristicEventTypes: RawTouristicEventType[];
}): TouristicEventTypeChoices =>
  rawTouristicEventTypes.reduce(
    (items, { type, id, pictogram }) => ({
      ...items,
      [id]: {
        id,
        type,
        pictogram,
      },
    }),
    {} as TouristicEventTypeChoices,
  );

export const adaptTouristicEventTypesForActivities = (
  rawTouristicEventTypes: RawTouristicEventType[],
): ActivityFilter[] =>
  rawTouristicEventTypes.map(({ type, id, pictogram }) => ({
    id,
    name: type,
    pictogram,
    type: 'TOURISTIC_EVENT_TYPE',
  }));

export const adaptTouristicEventTypesFilter = (
  rawTouristicEventTypes: RawTouristicEventType[],
): FilterWithoutType => ({
  id: EVENT_ID,
  options: rawTouristicEventTypes.map(rawOutdoorPractice => ({
    value: `${rawOutdoorPractice.id}`,
    label: rawOutdoorPractice.type,
    pictogramUrl: rawOutdoorPractice.pictogram,
  })),
});
