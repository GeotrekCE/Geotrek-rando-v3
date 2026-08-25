import { SourceDictionnary, Source } from 'modules/source/interface';
import { geFilesFromAttachments } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { VigilanceAreaType } from 'modules/vigilanceAreaType/interface';
import { VigilanceAreaLevel } from 'modules/vigilanceAreaLevel/interface';
import { Practicability, RawVigilanceArea, VigilanceArea } from './interface';

export const adaptVigilanceArea = ({
  rawVigilanceArea,
  language,
  vigilanceAreaTypes,
  vigilanceAreaLevels = {},
  sourcesDictionnary = {},
}: {
  rawVigilanceArea: RawVigilanceArea;
  language: string;
  vigilanceAreaTypes: Record<string, VigilanceAreaType>;
  vigilanceAreaLevels?: Record<string, VigilanceAreaLevel>;
  sourcesDictionnary?: SourceDictionnary;
}): VigilanceArea => {
  const typeId = String(rawVigilanceArea.vigilance_area_type);
  const type = vigilanceAreaTypes[typeId] || {
    id: typeId,
    name: '',
    pictogramUrl: null,
  };

  const levelId = rawVigilanceArea.vigilance_level
    ? String(rawVigilanceArea.vigilance_level)
    : null;
  const levelObj = levelId ? vigilanceAreaLevels[levelId] ?? null : null;

  const name =
    typeof rawVigilanceArea.name === 'string'
      ? rawVigilanceArea.name
      : rawVigilanceArea.name?.[language] || rawVigilanceArea.name?.fr || '';

  const description =
    typeof rawVigilanceArea.description === 'string'
      ? rawVigilanceArea.description
      : rawVigilanceArea.description?.[language] || rawVigilanceArea.description?.fr || '';

  const practicalInfo =
    typeof rawVigilanceArea.practical_info === 'string'
      ? rawVigilanceArea.practical_info
      : rawVigilanceArea.practical_info?.[language] || rawVigilanceArea.practical_info?.fr || '';

  // Determine criticality based on levelObj.level or raw criticality string
  // Note: level = null or missing is treated as lowest level (level 3 / info)
  let criticality: 'alert' | 'vigilance' | 'info' | string = 'info';
  if (levelObj) {
    if (levelObj.level === 1) {
      criticality = 'alert';
    } else if (levelObj.level === 2) {
      criticality = 'vigilance';
    } else {
      criticality = 'info';
    }
  } else if (typeof rawVigilanceArea.vigilance_level === 'string') {
    criticality = rawVigilanceArea.vigilance_level;
  } else if (rawVigilanceArea.criticality) {
    criticality = rawVigilanceArea.criticality;
  }

  const practicability: Practicability =
    rawVigilanceArea.practicability === 'not_practicable'
      ? 'closed'
      : rawVigilanceArea.practicability === 'under_condition_practicable'
      ? 'conditions'
      : rawVigilanceArea.practicability;

  // Fallback color if no color is provided by API
  const isRedVariant =
    practicability === 'closed' ||
    criticality === 'alert' ||
    criticality === 'high';

  const defaultFallbackColor = isRedVariant
    ? '#901A1A'
    : criticality === 'info'
    ? '#1257A8'
    : '#955a02';

  const color = levelObj?.color ?? defaultFallbackColor;

  const sources =
    rawVigilanceArea.sources
      ?.map(sourceId => sourcesDictionnary[sourceId])
      .filter((source): source is Source => Boolean(source)) ?? [];

  return {
    id: String(rawVigilanceArea.id),
    name,
    geometry: adaptGeometry(rawVigilanceArea.geometry),
    type,
    level: levelObj,
    color,
    practicability,
    description: description || null,
    practicalInfo: practicalInfo || null,
    externalInfoUrl: rawVigilanceArea.external_info_url ?? null,
    startDate: rawVigilanceArea.start_date ?? null,
    endDate: rawVigilanceArea.end_date ?? null,
    activeDays: rawVigilanceArea.active_days || [],
    activeMonths: rawVigilanceArea.active_months || [],
    updateDatetime: rawVigilanceArea.update_datetime ?? rawVigilanceArea.date_update ?? null,
    attachments: geFilesFromAttachments(rawVigilanceArea.attachments || []),
    criticality,
    sources,
  };
};

export const adaptVigilanceAreas = ({
  rawVigilanceAreas,
  language,
  vigilanceAreaTypes,
  vigilanceAreaLevels = {},
  sourcesDictionnary = {},
}: {
  rawVigilanceAreas: RawVigilanceArea[];
  language: string;
  vigilanceAreaTypes: Record<string, VigilanceAreaType>;
  vigilanceAreaLevels?: Record<string, VigilanceAreaLevel>;
  sourcesDictionnary?: SourceDictionnary;
}): VigilanceArea[] => {
  return rawVigilanceAreas.map(rawVigilanceArea =>
    adaptVigilanceArea({
      rawVigilanceArea,
      language,
      vigilanceAreaTypes,
      vigilanceAreaLevels,
      sourcesDictionnary,
    }),
  );
};

export interface VigilanceAreaGeometry {
  id: string;
  name: string;
  colorHex: string;
  levelMode: 'closed' | 'alert' | 'vigilance' | 'info';
  geometry: any;
  typeName?: string;
  typePictogramUri?: string | null;
  levelPictogramUri?: string | null;
  pictogramUri?: string | null;
}

export const adaptVigilanceAreaGeometry = (area: VigilanceArea): VigilanceAreaGeometry => {
  const isClosed =
    area.practicability === 'closed' ||
    area.practicability === 'not_practicable';

  const isRedVariant =
    isClosed ||
    area.criticality === 'alert' ||
    area.criticality === 'high';

  const defaultFallbackColor = isRedVariant
    ? '#901A1A'
    : area.criticality === 'info'
    ? '#1257A8'
    : '#955a02';

  const colorHex = area.color || area.level?.color || defaultFallbackColor;

  const levelMode: 'closed' | 'alert' | 'vigilance' | 'info' =
    isClosed
      ? 'closed'
      : area.criticality === 'alert' || area.criticality === 'high'
      ? 'alert'
      : area.criticality === 'info'
      ? 'info'
      : 'vigilance';

  return {
    id: area.id,
    name: area.name,
    colorHex,
    levelMode,
    geometry: area.geometry,
    typeName: area.type?.name ?? '',
    typePictogramUri: area.type?.pictogramUrl ?? null,
    levelPictogramUri: area.level?.pictogramUrl ?? null,
    pictogramUri: area.type?.pictogramUrl ?? area.level?.pictogramUrl ?? null,
  };
};
