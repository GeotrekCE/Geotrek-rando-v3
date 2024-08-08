import { SensitiveAreaPracticeDictionnary } from 'modules/sensitiveAreaPractice/interface';
import { adaptMultiPolygonGeometry, adaptPolygonGeometry } from 'modules/utils/geometry';
import { listOfColorsInPalette } from 'stylesheet';
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
    geometry:
      rawSensitiveArea.geometry.type === 'MultiPolygon'
        ? adaptMultiPolygonGeometry(rawSensitiveArea.geometry)
        : adaptPolygonGeometry(rawSensitiveArea.geometry),
    color: listOfColorsInPalette[i % listOfColorsInPalette.length],
  }));
