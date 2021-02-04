import { TouristicContentCategoryDictionnary } from 'modules/touristicContentCategory/interface';
import { getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry2D } from 'modules/utils/geometry';
import { RawTouristicContent, TouristicContent } from './interface';

export const adaptTouristicContent = ({
  rawTouristicContent,
  touristicContentCategories,
}: {
  rawTouristicContent: RawTouristicContent[];
  touristicContentCategories: TouristicContentCategoryDictionnary;
}): TouristicContent[] =>
  rawTouristicContent.map(rawTouristicObject => ({
    name: rawTouristicObject.name,
    description: rawTouristicObject.description_teaser,
    thumbnailUris: getThumbnails(rawTouristicObject.attachments),
    category: touristicContentCategories[rawTouristicObject.category],
    geometry: rawTouristicObject.geometry
      ? adaptGeometry2D(rawTouristicObject.geometry.coordinates)
      : null,
  }));
