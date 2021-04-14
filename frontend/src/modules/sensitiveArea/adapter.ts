import { SensitiveAreaPracticeDictionnary } from 'modules/sensitiveAreaPractice/interface';
import { RawSensitiveArea, SensitiveArea } from './interface';

export const adaptSensitiveAreas = ({
  rawSensitiveAreas,
  sensitiveAreaPracticeDictionnary,
}: {
  rawSensitiveAreas: RawSensitiveArea[];
  sensitiveAreaPracticeDictionnary: SensitiveAreaPracticeDictionnary;
}): SensitiveArea[] =>
  rawSensitiveAreas.map(rawSensitiveArea => ({
    name: rawSensitiveArea.name ?? null,
    description: rawSensitiveArea.description ?? null,
    contact: rawSensitiveArea.contact ?? null,
    infoUrl: rawSensitiveArea.info_url ?? null,
    period: rawSensitiveArea.period ?? null,
    practices:
      rawSensitiveArea.practices?.map(practiceId => sensitiveAreaPracticeDictionnary[practiceId]) ??
      [],
  }));
