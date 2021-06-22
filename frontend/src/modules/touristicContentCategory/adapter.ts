import { ActivityFilter } from 'modules/activities/interface';
import { CATEGORY_ID } from 'modules/filters/constant';
import { FilterWithoutType } from 'modules/filters/interface';
import {
  RawTouristicContentCategory,
  TouristicContentCategory,
  TouristicContentCategoryDictionnary,
  TouristicContentCategoryMapping,
} from './interface';

export const adaptTouristicContentCategory = (
  rawCat: RawTouristicContentCategory,
): TouristicContentCategory => ({
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
): ActivityFilter[] =>
  rawToutisticContentCategories
    .filter(isCompleteRawListTouristicContentCategory)
    .map(({ label, pictogram, id }) => ({
      name: label,
      pictogram,
      id: `${id}`,
      type: 'CATEGORY',
    }));

export const adaptTouristicContentCategories = (
  rawCats: RawTouristicContentCategory[],
): TouristicContentCategoryDictionnary =>
  rawCats.reduce(
    (cats, currentCat) => ({
      ...cats,
      [`${currentCat.id}`]: adaptTouristicContentCategory(currentCat),
    }),
    {},
  );

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
): TouristicContentCategoryMapping =>
  rawTouristicContentCategories.reduce(
    (touristicContentCategoryMapping, currentTouristicContentCategory) => ({
      ...touristicContentCategoryMapping,
      [currentTouristicContentCategory.id]: {
        type1: {
          id: currentTouristicContentCategory.types[0].id,
          label: currentTouristicContentCategory.types[0].label,
          values: currentTouristicContentCategory.types[0].values.map(({ id, label }) => ({
            value: id,
            label,
          })),
        },
        type2: {
          id: currentTouristicContentCategory.types[1].id,
          label: currentTouristicContentCategory.types[1].label,
          values: currentTouristicContentCategory.types[1].values.map(({ id, label }) => ({
            value: id,
            label,
          })),
        },
      },
    }),
    {},
  );
