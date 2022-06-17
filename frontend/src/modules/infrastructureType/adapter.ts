import { InfrastructureType, InfrastructureTypeDictionary } from './interface';
export const adaptInfrastructureType = (
  infrastructureType: InfrastructureType[],
): InfrastructureTypeDictionary => {
  return infrastructureType.reduce(
    (list, item) => ({
      ...list,
      [item.id]: item,
    }),
    {},
  );
};
