import { ActivityChoices } from 'modules/activities/interface';
import { CityDictionnary } from 'modules/city/interface';
import { DifficultyChoices } from 'modules/filters/difficulties/interface';
import { Choices } from 'modules/filters/interface';
import { getAttachments } from 'modules/utils/adapter';
import { formatHours } from 'modules/utils/time';
import { RawTrekResult, TrekResult } from './interface';
import { formatDistance } from './utils';

export const dataUnits = {
  distance: 'm',
  time: 'h',
};

const isRawTrekResultComplete = (
  rawTrekResult: Partial<RawTrekResult>,
): rawTrekResult is RawTrekResult =>
  rawTrekResult.ascent !== undefined &&
  rawTrekResult.attachments !== undefined &&
  rawTrekResult.departure_city !== undefined &&
  rawTrekResult.difficulty !== undefined &&
  rawTrekResult.duration !== undefined &&
  rawTrekResult.id !== undefined &&
  rawTrekResult.length_2d !== undefined &&
  rawTrekResult.name !== undefined &&
  rawTrekResult.practice !== undefined &&
  rawTrekResult.reservation_system !== undefined &&
  rawTrekResult.themes !== undefined;

export const adaptTrekResultList = ({
  resultsList,
  difficulties,
  themes,
  activities,
  cityDictionnary,
}: {
  resultsList: Partial<RawTrekResult>[];
  difficulties: DifficultyChoices;
  themes: Choices;
  activities: ActivityChoices;
  cityDictionnary: CityDictionnary;
}): TrekResult[] =>
  resultsList.filter(isRawTrekResultComplete).map(rawResult => ({
    type: 'TREK',
    id: `${rawResult.id}`,
    place: cityDictionnary[rawResult.departure_city]?.name ?? null,
    name: rawResult.name,
    tags: rawResult.themes.map(themeId => themes[themeId]?.label || ''),
    attachments: getAttachments(rawResult.attachments),
    category: activities[rawResult.practice] ?? null,
    informations: [
      {
        label: 'difficulty',
        value: (rawResult.difficulty !== null && difficulties[rawResult.difficulty]?.label) || '',
        pictogramUri:
          (rawResult.difficulty !== null && difficulties[rawResult.difficulty]?.pictogramUri) || '',
      },
      {
        label: 'duration',
        value: typeof rawResult.duration === 'number' ? formatHours(rawResult.duration) : '',
      },
      {
        label: 'distance',
        value: `${formatDistance(rawResult.length_2d)}`,
      },
      {
        label: 'elevation',
        value: `+${rawResult.ascent}${dataUnits.distance}`,
      },
      // we disable this button because the booking behaviour is not implemented yet
      // {
      //   label: 'reservationSystem',
      //   value:
      //     typeof rawResult.reservation_system === 'number'
      //       ? `${rawResult.reservation_system}`
      //       : null,
      // },
    ].filter(item => item.value.length > 0),
  }));
