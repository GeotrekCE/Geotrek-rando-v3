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
  TouristicContent,
  TouristicContentDetails,
  TouristicContentDetailsType,
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
  id: rawTCD.id,
  type: 'TOURISTIC_CONTENT',
  name: rawTCD.name,
  descriptionTeaser: rawTCD.description_teaser,
  thumbnailUris: getThumbnails(rawTCD.attachments),
  category: touristicContentCategory,
  geometry: rawTCD.geometry ? adaptGeometry(rawTCD.geometry) : null,
  attachments: getAttachments(rawTCD.attachments),
  description: rawTCD.description,
  sources: rawTCD.source !== null ? rawTCD.source.map(sourceId => sourceDictionnary[sourceId]) : [],
  contact: rawTCD.contact,
  email: rawTCD.email,
  website: rawTCD.website,
  place: rawTCD.cities.length > 0 ? cityDictionnary[rawTCD.cities[0]].name : '',
  themes:
    rawTCD.themes !== null ? rawTCD.themes.map(themeId => themeDictionnary[themeId].label) : [],
  pdf: rawTCD.pdf,
  types: Object.entries(rawTCD.types).reduce<TouristicContentDetailsType[]>(
    (adaptedTypes, typeEntry) => {
      const adaptedType = adaptTouristicType(typeEntry, touristicContentCategory);
      if (adaptedType) {
        adaptedTypes.push(adaptedType);
      }
      return adaptedTypes;
    },
    [],
  ),
  logoUri: rawTCD.approved === true ? DEFAULT_LOGO_URI : '',
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
