import { PoiTypeDictionnary } from 'modules/poiType/interface';
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
    thumbnailUri: rawPoi.pictures[0]?.url ?? fallbackImgUri,
    type: poiTypes[rawPoi.type],
  }));
