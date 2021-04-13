import { RawSensitiveArea, SensitiveArea } from './interface';

const adaptSensitiveArea = (rawSensitiveArea: RawSensitiveArea): SensitiveArea => ({
  name: rawSensitiveArea?.name.length > 0 ? rawSensitiveArea.name : null,
});

export const adaptSensitiveAreas = (rawSensitiveAreas: RawSensitiveArea[]): SensitiveArea[] =>
  rawSensitiveAreas.map(adaptSensitiveArea);
