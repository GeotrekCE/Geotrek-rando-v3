import { CityDictionnary } from 'modules/city/interface';
import { Choices } from 'modules/filters/interface';
import { SourceDictionnary } from 'modules/source/interface';
import {
  TouristicContentCategory,
  TouristicContentCategoryDictionnary,
} from 'modules/touristicContentCategory/interface';
import { PopupResult } from 'modules/trekResult/interface';
import { getLargeImagesOrThumbnailsFromAttachments, getThumbnail } from 'modules/utils/adapter';
import { getGlobalConfig } from 'modules/utils/api.config';
import { adaptGeometry } from 'modules/utils/geometry';
import {
  RawTouristicContent,
  RawTouristicContentDetails,
  RawTouristicContentPopupResult,
  RawTouristicContentResult,
  TouristicContent,
  TouristicContentDetails,
  TouristicContentDetailsType,
  TouristicContentResult,
} from './interface';

const APPROVED_LABEL_LOGO_URI = getGlobalConfig().touristicContentLabelImageUri;

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
    thumbnails: getLargeImagesOrThumbnailsFromAttachments(rawTouristicObject.attachments, true),
    images: getLargeImagesOrThumbnailsFromAttachments(rawTouristicObject.attachments, false),
    category: touristicContentCategories[rawTouristicObject.category],
    geometry: rawTouristicObject.geometry ? adaptGeometry(rawTouristicObject.geometry) : null,
    // An "approuved" touristic content means that the content is labeled by the park. A logo (configurable by the park) appears on the page.
    logoUri: rawTouristicObject.approved ? APPROVED_LABEL_LOGO_URI : null,
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
    images: getLargeImagesOrThumbnailsFromAttachments(rawTouristicObject.attachments, true),
    category: touristicContentCategories[rawTouristicObject.category] ?? null,
    place:
      Array.isArray(rawTouristicObject.cities) && rawTouristicObject.cities.length > 0
        ? cityDictionnary[rawTouristicObject.cities[0]].name
        : '',
    tags:
      rawTouristicObject.themes !== null
        ? rawTouristicObject.themes.map(themeId => themeDictionnary[themeId]?.label)
        : [],

    informations: [
      {
        label: 'types',
        value: Object.entries(rawTouristicObject.types).reduce<TouristicContentDetailsType[]>(
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
      },
    ],
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
  accessibility: rawTCD.properties.accessibility ?? null,
  practicalInfo: rawTCD.properties.practical_info ?? null,
  id: rawTCD.id,
  name: rawTCD.properties.name,
  descriptionTeaser: rawTCD.properties.description_teaser,
  thumbnails: getLargeImagesOrThumbnailsFromAttachments(rawTCD.properties.attachments, true),
  category: touristicContentCategory,
  geometry: rawTCD.geometry ? adaptGeometry(rawTCD.geometry) : null,
  images: getLargeImagesOrThumbnailsFromAttachments(rawTCD.properties.attachments, false),
  description: rawTCD.properties.description,
  sources: Array.isArray(rawTCD.properties.source)
    ? rawTCD.properties.source
        .filter(sourceId => sourceDictionnary[sourceId] !== undefined)
        .map(sourceId => sourceDictionnary[sourceId])
    : [],
  contact: rawTCD.properties.contact,
  email: rawTCD.properties.email,
  website: rawTCD.properties.website,
  place:
    rawTCD.properties.cities.length > 0 ? cityDictionnary[rawTCD.properties.cities[0]].name : '',
  cities_raw: rawTCD.properties.cities,
  themes: Array.isArray(rawTCD.properties.themes)
    ? rawTCD.properties.themes
        .filter(themeId => themeDictionnary[themeId] !== undefined)
        .map(themeId => themeDictionnary[themeId]?.label)
    : [],
  pdfUri: rawTCD.properties.pdf,
  types: Object.entries(rawTCD.properties.types).reduce<TouristicContentDetailsType[]>(
    (adaptedTypes, typeEntry) => {
      const adaptedType = adaptTouristicType(typeEntry, touristicContentCategory);
      if (adaptedType && adaptedType.values.length > 0) {
        adaptedTypes.push(adaptedType);
      }
      return adaptedTypes;
    },
    [],
  ),
  type: 'TOURISTIC_CONTENT',
  logoUri: rawTCD.properties.approved === true ? APPROVED_LABEL_LOGO_URI : null,
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

export const adaptTouristicContentPopupResults = (
  rawTouristicContent: RawTouristicContentPopupResult,
  cityDictionnary: CityDictionnary,
): PopupResult => {
  return {
    title: rawTouristicContent.name,
    place:
      rawTouristicContent.cities.length > 0
        ? cityDictionnary[rawTouristicContent.cities[0]].name
        : '',
    imgUrl: getThumbnail(rawTouristicContent.attachments) ?? getGlobalConfig().fallbackImageUri,
  };
};
