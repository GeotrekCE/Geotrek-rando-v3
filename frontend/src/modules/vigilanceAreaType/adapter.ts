import { RawVigilanceAreaType, VigilanceAreaType } from './interface';

const extractLocalizedText = (
  field: { [key: string]: string } | string | undefined,
  language: string,
): string => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[language] || field.fr || '';
};

export const adaptVigilanceAreaType = ({
  rawVigilanceAreaType,
  language,
}: {
  rawVigilanceAreaType: RawVigilanceAreaType;
  language: string;
}): VigilanceAreaType => {
  const rawName = extractLocalizedText(rawVigilanceAreaType.name, language);
  const fullName = extractLocalizedText(rawVigilanceAreaType.full_name, language);

  return {
    id: String(rawVigilanceAreaType.id),
    name: fullName || rawName,
    rawName,
    parent: rawVigilanceAreaType.parent ?? null,
    pictogramUrl: rawVigilanceAreaType.pictogram,
  };
};

export const adaptVigilanceAreaTypes = ({
  rawVigilanceAreaTypes,
  language,
}: {
  rawVigilanceAreaTypes: RawVigilanceAreaType[];
  language: string;
}): Record<string, VigilanceAreaType> => {
  const bareTypesById: Record<
    number,
    {
      id: string;
      rawName: string;
      fullName: string;
      parent: number | null;
      pictogram: string | null;
    }
  > = {};

  for (const rawVigilanceAreaType of rawVigilanceAreaTypes) {
    bareTypesById[rawVigilanceAreaType.id] = {
      id: String(rawVigilanceAreaType.id),
      rawName: extractLocalizedText(rawVigilanceAreaType.name, language),
      fullName: extractLocalizedText(rawVigilanceAreaType.full_name, language),
      parent: rawVigilanceAreaType.parent ?? null,
      pictogram: rawVigilanceAreaType.pictogram ?? null,
    };
  }

  const adaptedTypes: Record<string, VigilanceAreaType> = {};

  for (const rawVigilanceAreaType of rawVigilanceAreaTypes) {
    const currentType = bareTypesById[rawVigilanceAreaType.id];
    let hierarchicalName = currentType.fullName || currentType.rawName;

    if (!currentType.fullName && currentType.parent !== null && bareTypesById[currentType.parent]) {
      const lineage: string[] = [];
      let currentParentId: number | null = currentType.parent;
      const visitedIds = new Set<number>([rawVigilanceAreaType.id]);

      while (
        currentParentId !== null &&
        bareTypesById[currentParentId] &&
        !visitedIds.has(currentParentId)
      ) {
        visitedIds.add(currentParentId);
        lineage.unshift(bareTypesById[currentParentId].rawName);
        currentParentId = bareTypesById[currentParentId].parent;
      }

      const rootName = lineage[0];
      const level2Name = lineage.length > 1 ? lineage[1] : currentType.rawName;
      hierarchicalName = `${rootName} > ${level2Name}`;
    }

    adaptedTypes[String(rawVigilanceAreaType.id)] = {
      id: currentType.id,
      name: hierarchicalName,
      rawName: currentType.rawName,
      parent: currentType.parent,
      pictogramUrl: currentType.pictogram,
    };
  }

  return adaptedTypes;
};
