import { RawSensitiveArea, SensitiveArea } from './interface';

const adaptSensitiveArea = (rawSensitiveArea: RawSensitiveArea): SensitiveArea => ({
  name: rawSensitiveArea?.name.length > 0 ? rawSensitiveArea.name : null,
  description: rawSensitiveArea.description?.length > 0 ? rawSensitiveArea.description : null,
  contact: rawSensitiveArea.contact?.length > 0 ? rawSensitiveArea.contact : null,
  infoUrl: rawSensitiveArea.info_url?.length > 0 ? rawSensitiveArea.info_url : null,
});

export const adaptSensitiveAreas = (rawSensitiveAreas: RawSensitiveArea[]): SensitiveArea[] =>
  rawSensitiveAreas.map(adaptSensitiveArea);
