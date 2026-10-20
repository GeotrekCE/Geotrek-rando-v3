import { Source, SourceDictionnary } from 'modules/source/interface';
import { geFilesFromAttachments } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { VigilanceAreaType } from 'modules/vigilanceAreaType/interface';
import { VigilanceAreaLevel } from 'modules/vigilanceAreaLevel/interface';
import { RawVigilanceArea, RawVigilancePeriod, VigilanceArea, VigilancePeriod } from './interface';

export const adaptVigilancePeriods = (rawPeriods: RawVigilancePeriod[] = []): VigilancePeriod[] =>
  rawPeriods.map(rawPeriod => ({
    id: rawPeriod.id,
    startDate: rawPeriod.start_date ?? null,
    endDate: rawPeriod.end_date ?? null,
    activeDays: rawPeriod.active_days ?? [],
    annual: Boolean(rawPeriod.annual),
  }));

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

  let criticality: 'alert' | 'vigilance' | 'info' | null = null;
  if (levelObj) {
    if (levelObj.level === 1) {
      criticality = 'alert';
    } else if (levelObj.level === 2) {
      criticality = 'vigilance';
    } else if (levelObj.level === 3) {
      criticality = 'info';
    }
  } else if (typeof rawVigilanceArea.vigilance_level === 'string') {
    criticality = rawVigilanceArea.vigilance_level as 'alert' | 'vigilance' | 'info';
  }

  const isImpracticable = Boolean(rawVigilanceArea.impracticable);
  const defaultLevelColor =
    levelObj?.level === 1
      ? '#901A1A'
      : levelObj?.level === 2
      ? '#955a02'
      : levelObj?.level === 3
      ? '#1257A8'
      : '#d17a00';
  const color = isImpracticable ? '#901A1A' : levelObj?.color ?? defaultLevelColor;

  const sources =
    rawVigilanceArea.sources
      ?.map(sourceId => sourcesDictionnary[sourceId])
      .filter((source): source is Source => Boolean(source)) ?? [];

  const periods: VigilancePeriod[] = adaptVigilancePeriods(rawVigilanceArea.periods);

  return {
    id: String(rawVigilanceArea.id),
    name,
    geometry: adaptGeometry(rawVigilanceArea.geometry),
    type,
    level: levelObj,
    color,
    isImpracticable,
    description: description || null,
    practicalInfo: practicalInfo || null,
    externalInfoUrl: rawVigilanceArea.external_info_url ?? null,
    periods,
    updateDatetime: rawVigilanceArea.date_update ?? rawVigilanceArea.update_datetime ?? null,
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
  isImpracticable: boolean;
  levelMode: 'closed' | 'alert' | 'vigilance' | 'info';
  levelNumber?: number | null;
  geometry: any;
  typeName?: string;
  levelName?: string;
  typePictogramUri?: string | null;
  levelPictogramUri?: string | null;
  pictogramUri?: string | null;
  periods: VigilancePeriod[];
  description?: string | null;
}

export const adaptVigilanceAreaGeometry = (area: VigilanceArea): VigilanceAreaGeometry => {
  const isImpracticable = area.isImpracticable;

  const colorHex = isImpracticable
    ? '#901A1A'
    : area.color || area.level?.color || '#d17a00';

  const levelMode: 'closed' | 'alert' | 'vigilance' | 'info' =
    isImpracticable
      ? 'closed'
      : area.criticality === 'alert' || area.criticality === 'high' || area.level?.level === 1
      ? 'alert'
      : area.criticality === 'info' || area.level?.level === 3
      ? 'info'
      : 'vigilance';

  return {
    id: area.id,
    name: area.name,
    colorHex,
    isImpracticable,
    levelMode,
    levelNumber: area.level?.level ?? null,
    geometry: area.geometry,
    typeName: area.type?.name ?? '',
    levelName: area.level?.name ?? '',
    typePictogramUri: area.type?.pictogramUrl ?? null,
    levelPictogramUri: area.level?.pictogramUrl ?? null,
    pictogramUri: area.type?.pictogramUrl ?? area.level?.pictogramUrl ?? null,
    periods: area.periods || [],
    description: area.description ?? null,
  };
};
