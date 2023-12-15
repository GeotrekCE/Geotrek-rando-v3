import { ActivityBarLinks } from 'modules/home/interface';
import { ActivityFilter } from '../activities/interface';
import { EVENT_ID } from '../filters/constant';
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
        label: type,
        pictogramUri: pictogram,
      },
    }),
    {} as TouristicEventTypeChoices,
  );

export const adaptTouristicEventTypesForActivities = (
  rawTouristicEventTypes: RawTouristicEventType[],
  { grouped }: Partial<ActivityBarLinks>,
): ActivityFilter[] => {
  if (grouped) {
    return [
      {
        label: 'Touristic event categories',
        titleTranslationId: 'home.activityBar.touristicEvent',
        pictogramUri: '/icons/category-events.svg',
        id: rawTouristicEventTypes
          .map(({ id }) => `${id}`)
          .sort()
          .join(','),
        order: null,
        type: 'TOURISTIC_EVENT_TYPE',
      },
    ];
  }
  return rawTouristicEventTypes.map(({ type, id, pictogram, order = null }) => ({
    id,
    label: type,
    order,
    pictogramUri: pictogram,
    type: 'TOURISTIC_EVENT_TYPE',
  }));
};

export const adaptTouristicEventTypesFilter = (
  rawTouristicEventTypes: RawTouristicEventType[],
): FilterWithoutType => ({
  id: EVENT_ID,
  options: rawTouristicEventTypes.map(rawOutdoorPractice => ({
    value: `${rawOutdoorPractice.id}`,
    label: rawOutdoorPractice.type,
    pictogramUri: rawOutdoorPractice.pictogram,
  })),
});
