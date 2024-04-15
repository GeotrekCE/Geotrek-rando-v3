import getNextConfig from 'next/config';
import { ActivityChoices } from 'modules/activities/interface';
import { CityDictionnary } from 'modules/city/interface';
import { DifficultyChoices } from 'modules/filters/difficulties/interface';
import { Choices } from 'modules/filters/interface';
import { getAttachmentsOrThumbnails } from 'modules/utils/adapter';
import { formatHours } from 'modules/utils/time';
import { NetworkDictionnary } from 'modules/networks/interface';
import { InformationCardArray, RawTrekResult, TrekResult } from './interface';
import { formatDistance } from './utils';

const {
  publicRuntimeConfig: {
    resultCard: {
      trek: {
        location,
        themes: { display: displayThemes },
        informations = [],
      },
    },
  },
} = getNextConfig();

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
  networks,
}: {
  resultsList: Partial<RawTrekResult>[];
  difficulties: DifficultyChoices;
  themes: Choices;
  activities: ActivityChoices;
  cityDictionnary: CityDictionnary;
  networks: NetworkDictionnary;
}): TrekResult[] =>
  resultsList.filter(isRawTrekResultComplete).map(rawResult => ({
    type: 'TREK',
    id: `${rawResult.id}`,
    place: (location.display === true && cityDictionnary[rawResult.departure_city]?.name) || null,
    name: rawResult.name,
    tags:
      displayThemes === true ? rawResult.themes.map(themeId => themes[themeId]?.label || '') : [],
    attachments: getAttachmentsOrThumbnails(rawResult.attachments, true),
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
        label: 'positiveElevation',
        value: `+${rawResult.ascent}${dataUnits.distance}`,
      },
      {
        label: 'negativeElevation',
        value: `${rawResult.descent}${dataUnits.distance}`,
      },
      {
        label: 'courseType',
        value: rawResult.courseType?.label ?? '',
        pictogramUri: rawResult.courseType?.pictogramUri ?? '',
      },
      {
        label: 'networks',
        value: rawResult.networks.map(networkId => networks[networkId]).filter(Boolean),
      } as InformationCardArray,
      // we disable this button because the booking behaviour is not implemented yet
      // {
      //   label: 'reservationSystem',
      //   value:
      //     typeof rawResult.reservation_system === 'number'
      //       ? `${rawResult.reservation_system}`
      //       : null,
      // },
    ]
      .filter(item => informations.includes(item.label) && item.value.length > 0)
      .sort((a, b) => informations.indexOf(a.label) - informations.indexOf(b.label)),
  }));
