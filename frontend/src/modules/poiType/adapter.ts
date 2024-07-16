import { PoiType, PoiTypeDictionnary, RawPoiType } from './interface';

const adaptPoiType = (rawPoiType: RawPoiType): PoiType => ({
  label: rawPoiType.label,
  pictogramUri: rawPoiType.pictogram,
});

export const adaptPoiTypes = (rawPoiTypes: RawPoiType[]): PoiTypeDictionnary =>
  Object.fromEntries(rawPoiTypes.map(poiTypes => [poiTypes.id, adaptPoiType(poiTypes)]));
