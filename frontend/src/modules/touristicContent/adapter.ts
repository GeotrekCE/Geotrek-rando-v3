import { CityDictionnary } from 'modules/city/interface';
import { Choices } from 'modules/filters/interface';
import { SourceDictionnary } from 'modules/source/interface';
import {
  TouristicContentCategory,
  TouristicContentCategoryDictionnary,
} from 'modules/touristicContentCategory/interface';
import { getAttachments, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import {
  RawTouristicContent,
  RawTouristicContentDetails,
  RawTouristicContentResult,
  TouristicContent,
  TouristicContentDetails,
  TouristicContentDetailsType,
  TouristicContentResult,
} from './interface';

const DEFAULT_LOGO_URI =
  'https://www.ecrins-parcnational.fr/sites/ecrins-parcnational.com/files/page/12952/14211espritparc-nationalecrinshd_0.jpg';

export const adaptTouristicContent = ({
  rawTouristicContent,
  touristicContentCategories,
}: {
  rawTouristicContent: RawTouristicContent[];
  touristicContentCategories: TouristicContentCategoryDictionnary;
}): TouristicContent[] =>
  rawTouristicContent.map(rawTouristicObject => ({
    id: rawTouristicObject.id,
    type: 'TOURISTIC_CONTENT',
    name: rawTouristicObject.name,
    descriptionTeaser: rawTouristicObject.description_teaser,
    thumbnailUris: getThumbnails(rawTouristicObject.attachments),
    category: touristicContentCategories[rawTouristicObject.category],
    geometry: rawTouristicObject.geometry ? adaptGeometry(rawTouristicObject.geometry) : null,
    logoUri: rawTouristicObject.approved ? DEFAULT_LOGO_URI : '',
  }));

export const adaptTouristicContentResult = ({
  rawTouristicContent,
  touristicContentCategories,
  themeDictionnary,
  cityDictionnary,
}: {
  rawTouristicContent: RawTouristicContentResult[];
  touristicContentCategories: TouristicContentCategoryDictionnary;
  themeDictionnary: Choices;
  cityDictionnary: CityDictionnary;
}): TouristicContentResult[] =>
  rawTouristicContent.map(rawTouristicObject => ({
    id: rawTouristicObject.id,
    type: 'TOURISTIC_CONTENT',
    name: rawTouristicObject.name,
    descriptionTeaser: rawTouristicObject.description_teaser,
    thumbnailUris: getThumbnails(rawTouristicObject.attachments),
    category: touristicContentCategories[rawTouristicObject.category],
    logoUri: '',
    place:
      rawTouristicObject.cities.length > 0
        ? cityDictionnary[rawTouristicObject.cities[0]].name
        : '',
    themes:
      rawTouristicObject.themes !== null
        ? rawTouristicObject.themes.map(themeId => themeDictionnary[themeId].label)
        : [],
    types: Object.entries(rawTouristicObject.types).reduce<TouristicContentDetailsType[]>(
      (adaptedTypes, typeEntry) => {
        const adaptedType = adaptTouristicType(
          typeEntry,
          touristicContentCategories[rawTouristicObject.category],
        );
        if (adaptedType) {
          adaptedTypes.push(adaptedType);
        }
        return adaptedTypes;
      },
      [],
    ),
  }));

export const adaptTouristicContentDetails = ({
  rawTCD,
  touristicContentCategory,
  sourceDictionnary,
  cityDictionnary,
  themeDictionnary,
}: {
  rawTCD: RawTouristicContentDetails;
  touristicContentCategory: TouristicContentCategory;
  sourceDictionnary: SourceDictionnary;
  cityDictionnary: CityDictionnary;
  themeDictionnary: Choices;
}): TouristicContentDetails => ({
  id: rawTCD.properties.id,
  name: rawTCD.properties.name,
  descriptionTeaser: rawTCD.properties.description_teaser,
  thumbnailUris: getThumbnails(rawTCD.properties.attachments),
  category: touristicContentCategory,
  geometry: rawTCD.geometry ? adaptGeometry(rawTCD.geometry) : null,
  attachments: getAttachments(rawTCD.properties.attachments),
  description: rawTCD.properties.description,
  sources:
    rawTCD.properties.source !== null
      ? rawTCD.properties.source.map(sourceId => sourceDictionnary[sourceId])
      : [],
  contact: rawTCD.properties.contact,
  email: rawTCD.properties.email,
  website: rawTCD.properties.website,
  place:
    rawTCD.properties.cities.length > 0 ? cityDictionnary[rawTCD.properties.cities[0]].name : '',
  themes:
    rawTCD.properties.themes !== null
      ? rawTCD.properties.themes.map(themeId => themeDictionnary[themeId].label)
      : [],
  pdf: rawTCD.properties.pdf,
  types: Object.entries(rawTCD.properties.types).reduce<TouristicContentDetailsType[]>(
    (adaptedTypes, typeEntry) => {
      const adaptedType = adaptTouristicType(typeEntry, touristicContentCategory);
      if (adaptedType) {
        adaptedTypes.push(adaptedType);
      }
      return adaptedTypes;
    },
    [],
  ),
  logoUri: rawTCD.properties.approved === true ? DEFAULT_LOGO_URI : '',
  bbox: {
    corner1: { x: rawTCD.bbox[0], y: rawTCD.bbox[1] },
    corner2: { x: rawTCD.bbox[2], y: rawTCD.bbox[3] },
  },
});

const adaptTouristicType = (
  typeEntry: [string, number[]],
  touristicContentCategory: TouristicContentCategory,
) => {
  const type = touristicContentCategory.types.find(t => `${t.id}` === typeEntry[0]);
  return (
    type && {
      label: type.label,
      values: typeEntry[1].map(
        valueId => type.values.find(v => v.id === valueId)?.label ?? `${valueId}`,
      ),
    }
  );
};
