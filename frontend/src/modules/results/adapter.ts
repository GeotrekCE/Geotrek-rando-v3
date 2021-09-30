import { ActivityChoices } from 'modules/activities/interface';
import { CityDictionnary } from 'modules/city/interface';
import { DifficultyChoices } from 'modules/filters/difficulties/interface';
import { Choices } from 'modules/filters/interface';
import { getAttachments, getThumbnails } from 'modules/utils/adapter';
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
    activityIcon: 'TODO',
    place: cityDictionnary[rawResult.departure_city]?.name ?? null,
    title: rawResult.name,
    tags: rawResult.themes.map(themeId => themes[themeId]?.label || ''),
    thumbnailUris: getThumbnails(rawResult.attachments),
    attachments: getAttachments(rawResult.attachments),
    practice: activities[rawResult.practice] ?? null,
    informations: {
      duration: rawResult.duration !== null ? formatHours(rawResult.duration) : null,
      distance: `${formatDistance(rawResult.length_2d)}`,
      elevation: `+${rawResult.ascent}${dataUnits.distance}`,
      difficulty:
        rawResult.difficulty !== null
          ? {
              label: difficulties[rawResult.difficulty]?.label || '',
              pictogramUri: difficulties[rawResult.difficulty]?.pictogramUri || '',
            }
          : null,
      reservationSystem: rawResult.reservation_system,
    },
  }));
