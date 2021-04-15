import { SensitiveAreaPracticeDictionnary } from 'modules/sensitiveAreaPractice/interface';
import { adaptPolygonGeometry } from 'modules/utils/geometry';
import { getListOfColorsInPalette } from 'stylesheet';
import { RawSensitiveArea, SensitiveArea } from './interface';

export const adaptSensitiveAreas = ({
  rawSensitiveAreas,
  sensitiveAreaPracticeDictionnary,
}: {
  rawSensitiveAreas: RawSensitiveArea[];
  sensitiveAreaPracticeDictionnary: SensitiveAreaPracticeDictionnary;
}): SensitiveArea[] =>
  rawSensitiveAreas.map((rawSensitiveArea, i) => ({
    name: rawSensitiveArea.name ?? null,
    description: rawSensitiveArea.description ?? null,
    contact: rawSensitiveArea.contact ?? null,
    infoUrl: rawSensitiveArea.info_url ?? null,
    period: rawSensitiveArea.period ?? null,
    practices:
      rawSensitiveArea.practices?.map(practiceId => sensitiveAreaPracticeDictionnary[practiceId]) ??
      [],
    geometry: adaptPolygonGeometry(rawSensitiveArea.geometry),
    color: getListOfColorsInPalette[i % getListOfColorsInPalette.length],
  }));
