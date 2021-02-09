import { FilterWithoutType } from 'modules/filters/interface';
import {
  RawTouristicContentCategory,
  TouristicContentCategory,
  TouristicContentCategoryDictionnary,
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
