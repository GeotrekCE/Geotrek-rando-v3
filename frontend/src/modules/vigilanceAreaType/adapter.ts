import { RawVigilanceAreaType, VigilanceAreaType } from './interface';

export const adaptVigilanceAreaType = ({
  rawVigilanceAreaType,
  language,
}: {
  rawVigilanceAreaType: RawVigilanceAreaType;
  language: string;
}): VigilanceAreaType => {
  const name =
    typeof rawVigilanceAreaType.name === 'string'
      ? rawVigilanceAreaType.name
      : rawVigilanceAreaType.name?.[language] || rawVigilanceAreaType.name?.fr || '';

  return {
    id: String(rawVigilanceAreaType.id),
    name,
    rawName: name,
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
    { id: string; rawName: string; parent: number | null; pictogram: string | null }
  > = {};

  for (const rawType of rawVigilanceAreaTypes) {
    const rawName =
      typeof rawType.name === 'string'
        ? rawType.name
        : rawType.name?.[language] || rawType.name?.fr || '';
    bareTypesById[rawType.id] = {
      id: String(rawType.id),
      rawName,
      parent: rawType.parent ?? null,
      pictogram: rawType.pictogram ?? null,
    };
  }

  const adaptedTypes: Record<string, VigilanceAreaType> = {};

  for (const rawType of rawVigilanceAreaTypes) {
    const currentType = bareTypesById[rawType.id];
    let hierarchicalName = currentType.rawName;

    if (currentType.parent !== null && bareTypesById[currentType.parent]) {
      const lineage: string[] = [];
      let currentParentId: number | null = currentType.parent;
      const visitedIds = new Set<number>([rawType.id]);

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

    adaptedTypes[String(rawType.id)] = {
      id: currentType.id,
      name: hierarchicalName,
      rawName: currentType.rawName,
      parent: currentType.parent,
      pictogramUrl: currentType.pictogram,
    };
  }

  return adaptedTypes;
};
