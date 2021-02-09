import { TouristicContentCategoryDictionnary } from 'modules/touristicContentCategory/interface';
import { getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { RawTouristicContent, TouristicContent } from './interface';

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
    description: rawTouristicObject.description_teaser,
    thumbnailUris: getThumbnails(rawTouristicObject.attachments),
    category: touristicContentCategories[rawTouristicObject.category],
    geometry: rawTouristicObject.geometry ? adaptGeometry(rawTouristicObject.geometry) : null,
  }));
