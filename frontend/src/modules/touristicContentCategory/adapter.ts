import { ActivityFilter } from 'modules/activities/interface';
import { CATEGORY_ID } from 'modules/filters/constant';
import { FilterWithoutType } from 'modules/filters/interface';
import { ActivityBarLinks } from 'modules/home/interface';
import {
  RawTouristicContentCategory,
  TouristicContentCategory,
  TouristicContentCategoryDictionnary,
  TouristicContentCategoryMapping,
} from './interface';

export const adaptTouristicContentCategory = (
  rawCat: RawTouristicContentCategory,
): TouristicContentCategory => ({
  id: rawCat.id,
  label: rawCat.label,
  pictogramUri: rawCat.pictogram,
  types: rawCat.types,
});

const isCompleteRawListTouristicContentCategory = (
  rawTouristicContentCategory: Partial<RawTouristicContentCategory>,
): rawTouristicContentCategory is RawTouristicContentCategory =>
  rawTouristicContentCategory.label !== undefined &&
  rawTouristicContentCategory.pictogram !== undefined &&
  rawTouristicContentCategory.id !== undefined;

export const adaptTouristicContentCategoryList = (
  rawToutisticContentCategories: Partial<RawTouristicContentCategory>[],
  { grouped, iconUrl }: Partial<ActivityBarLinks>,
): ActivityFilter[] => {
  if (grouped) {
    return [
      {
        label: 'Touristic content categories',
        titleTranslationId: 'home.activityBar.touristicContent',
        pictogramUri: iconUrl ?? '/icons/category-services.svg',
        id: rawToutisticContentCategories
          .filter(isCompleteRawListTouristicContentCategory)
          .map(({ id }) => `${id}`)
          .sort()
          .join(','),
        order: null,
        type: 'CATEGORY',
      },
    ];
  }
  return rawToutisticContentCategories
    .filter(isCompleteRawListTouristicContentCategory)
    .map(({ label, pictogram, id, order = null }) => ({
      label,
      pictogramUri: pictogram,
      id: `${id}`,
      order,
      type: 'CATEGORY',
    }));
};

export const adaptTouristicContentCategories = (
  rawCats: RawTouristicContentCategory[],
): TouristicContentCategoryDictionnary =>
  Object.fromEntries(rawCats.map(cat => [cat.id, adaptTouristicContentCategory(cat)]));

export const adaptTouristicContentCategoryFilter = (
  rawTouristicContentCategories: RawTouristicContentCategory[],
): FilterWithoutType => ({
  id: CATEGORY_ID,
  options: rawTouristicContentCategories.map(rawTouristicContentCategorie => ({
    value: `${rawTouristicContentCategorie.id}`,
    label: rawTouristicContentCategorie.label,
    pictogramUrl: rawTouristicContentCategorie.pictogram,
  })),
});

export const adaptTouristicContentCategoryHashMap = (
  rawTouristicContentCategories: RawTouristicContentCategory[],
): TouristicContentCategoryMapping => {
  return rawTouristicContentCategories.reduce(
    (touristicContentCategoryMapping, currentTouristicContentCategory) => ({
      ...touristicContentCategoryMapping,
      [currentTouristicContentCategory.id]: currentTouristicContentCategory.types.map(i => ({
        id: i.id,
        label: i.label,
        category: currentTouristicContentCategory.label,
        values: i.values.map(({ id, label }) => ({
          value: id,
          label,
        })),
      })),
    }),
    {},
  );
};
