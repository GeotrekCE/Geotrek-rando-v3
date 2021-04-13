import { RawSensitiveArea, SensitiveArea } from './interface';

const adaptSensitiveArea = (rawSensitiveArea: RawSensitiveArea): SensitiveArea => ({
  name: rawSensitiveArea.name ?? null,
  description: rawSensitiveArea.description ?? null,
  contact: rawSensitiveArea.contact ?? null,
  infoUrl: rawSensitiveArea.info_url ?? null,
});

export const adaptSensitiveAreas = (rawSensitiveAreas: RawSensitiveArea[]): SensitiveArea[] =>
  rawSensitiveAreas.map(adaptSensitiveArea);
