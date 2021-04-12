import { RawSensitiveArea, SensitiveArea } from './interface';

const adaptSensitiveArea = (rawSensitiveArea: RawSensitiveArea): SensitiveArea => ({
  name: rawSensitiveArea.name,
});

export const adaptSensitiveAreas = (rawSensitiveAreas: RawSensitiveArea[]): SensitiveArea[] =>
  rawSensitiveAreas.map(adaptSensitiveArea);
