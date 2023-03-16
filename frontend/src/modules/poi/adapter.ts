import { PoiTypeDictionnary } from 'modules/poiType/interface';
import { getAttachments, getThumbnails } from 'modules/utils/adapter';
import { Poi, RawPoi } from './interface';

export const adaptPoi = ({
  rawPoisResults,
  poiTypes,
}: {
  rawPoisResults: RawPoi[];
  poiTypes: PoiTypeDictionnary;
}): Poi[] =>
  rawPoisResults.map(rawPoi => ({
    id: `${rawPoi.id}`,
    name: rawPoi.name,
    description: rawPoi.description,
    thumbnails: getThumbnails(rawPoi.attachments),
    attachments: getAttachments(rawPoi.attachments),
    type: poiTypes[rawPoi.type],
    geometry: {
      x: rawPoi.geometry.coordinates[0],
      y: rawPoi.geometry.coordinates[1],
      z: rawPoi.geometry.coordinates[2],
    },
  }));
