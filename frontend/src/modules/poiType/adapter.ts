import { PoiType, PoiTypeDictionnary, RawPoiType } from './interface';

const adaptPoiType = (rawPoiType: RawPoiType): PoiType => ({
  label: rawPoiType.label,
  pictogramUri: rawPoiType.pictogram,
});

export const adaptPoiTypes = (rawPoiTypes: RawPoiType[]): PoiTypeDictionnary =>
  rawPoiTypes.reduce(
    (poiTypes, currentPoiType) => ({
      ...poiTypes,
      [`${currentPoiType.id}`]: adaptPoiType(currentPoiType),
    }),
    {},
  );
