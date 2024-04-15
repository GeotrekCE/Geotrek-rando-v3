import { PoiTypeDictionnary } from 'modules/poiType/interface';
import { getAttachmentsOrThumbnails } from 'modules/utils/adapter';
import { adaptViewPoints } from 'modules/viewPoint/adapter';
import { Poi, RawPoi } from './interface';

export const adaptPoi = ({
  rawPoisResults,
  poiTypes,
}: {
  rawPoisResults: RawPoi[];
  poiTypes: PoiTypeDictionnary;
}): Promise<Poi[]> =>
  Promise.all(
    rawPoisResults.map(async rawPoi => {
      const viewPoints =
        rawPoi.view_points?.length > 0 ? await adaptViewPoints(rawPoi.view_points) : [];

      return {
        id: `${rawPoi.id}`,
        name: rawPoi.name,
        description: rawPoi.description,
        thumbnails: getAttachmentsOrThumbnails(rawPoi.attachments, true),
        attachments: getAttachmentsOrThumbnails(rawPoi.attachments, false),
        type: poiTypes[rawPoi.type],
        geometry: {
          x: rawPoi.geometry.coordinates[0],
          y: rawPoi.geometry.coordinates[1],
          z: rawPoi.geometry.coordinates[2],
        },
        viewPoints,
      };
    }),
  );
