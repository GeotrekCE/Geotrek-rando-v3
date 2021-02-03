import { PoiTypeDictionnary } from 'modules/poiType/interface';
import { getThumbnail } from 'modules/utils/adapter';
import { Poi, RawPoi } from './interface';

const fallbackImgUri = 'https://upload.wikimedia.org/wikipedia/fr/d/df/Logo_ecrins.png';

export const adaptPoi = ({
  rawPoisResults,
  poiTypes,
}: {
  rawPoisResults: RawPoi[];
  poiTypes: PoiTypeDictionnary;
}): Poi[] =>
  rawPoisResults.map(rawPoi => ({
    name: rawPoi.name,
    description: rawPoi.description,
    thumbnailUri: getThumbnail(rawPoi.attachments) ?? fallbackImgUri,
    type: poiTypes[rawPoi.type],
    geometry: {
      x: rawPoi.geometry.coordinates[0],
      y: rawPoi.geometry.coordinates[1],
      z: rawPoi.geometry.coordinates[2],
    },
  }));
