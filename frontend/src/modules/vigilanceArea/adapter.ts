import { geFilesFromAttachments } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { VigilanceAreaType } from 'modules/vigilanceAreaType/interface';
import { RawVigilanceArea, VigilanceArea } from './interface';

export const adaptVigilanceArea = ({
  rawVigilanceArea,
  language,
  vigilanceAreaTypes,
}: {
  rawVigilanceArea: RawVigilanceArea;
  language: string;
  vigilanceAreaTypes: Record<string, VigilanceAreaType>;
}): VigilanceArea => {
  const typeId = String(rawVigilanceArea.vigilance_area_type);
  const type = vigilanceAreaTypes[typeId] || {
    id: typeId,
    name: '',
    pictogramUrl: null,
  };

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

  return {
    id: String(rawVigilanceArea.id),
    name,
    geometry: adaptGeometry(rawVigilanceArea.geometry),
    type,
    practicability: rawVigilanceArea.practicability,
    description,
    practicalInfo,
    externalInfoUrl: rawVigilanceArea.external_info_url,
    startDate: rawVigilanceArea.start_date,
    endDate: rawVigilanceArea.end_date,
    activeDays: rawVigilanceArea.active_days || [],
    activeMonths: rawVigilanceArea.active_months || [],
    updateDatetime: rawVigilanceArea.update_datetime,
    attachments: geFilesFromAttachments(rawVigilanceArea.attachments || []),
    criticality: rawVigilanceArea.criticality,
  };
};

export const adaptVigilanceAreas = ({
  rawVigilanceAreas,
  language,
  vigilanceAreaTypes,
}: {
  rawVigilanceAreas: RawVigilanceArea[];
  language: string;
  vigilanceAreaTypes: Record<string, VigilanceAreaType>;
}): VigilanceArea[] => {
  return rawVigilanceAreas.map(rawVigilanceArea =>
    adaptVigilanceArea({ rawVigilanceArea, language, vigilanceAreaTypes }),
  );
};
