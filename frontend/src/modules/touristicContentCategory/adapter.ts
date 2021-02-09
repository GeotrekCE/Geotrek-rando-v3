import { FilterWithoutType } from 'modules/filters/interface';
import {
  RawTouristicContentCategory,
  TouristicContentCategory,
  TouristicContentCategoryDictionnary,
  TouristicContentCategoryHashMap,
} from './interface';

const adaptTouristicContentCategory = (
  rawCat: RawTouristicContentCategory,
): TouristicContentCategory => ({
  label: rawCat.label,
  pictogramUri: rawCat.pictogram,
});

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
  id: 'service',
  options: rawTouristicContentCategories.map(rawTouristicContentCategorie => ({
    value: `${rawTouristicContentCategorie.id}`,
    label: rawTouristicContentCategorie.label,
  })),
});

export const adaptTouristicContentCategoryHashMap = (
  rawTouristicContentCategories: RawTouristicContentCategory[],
): TouristicContentCategoryHashMap =>
  rawTouristicContentCategories.reduce(
    (hashMap, currentTouristicContentCategory) => ({
      ...hashMap,
      [currentTouristicContentCategory.id]: {
        type1: {
          id: currentTouristicContentCategory.types[0].id,
          label: currentTouristicContentCategory.types[0].label,
          values: currentTouristicContentCategory.types[0].values.map(({ id, label }) => ({
            value: id,
            label,
          })),
        },
      },
    }),
    {},
  );
