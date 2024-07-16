import { InfrastructureType, InfrastructureTypeDictionary } from './interface';
export const adaptInfrastructureType = (
  infrastructureType: InfrastructureType[],
): InfrastructureTypeDictionary =>
  Object.fromEntries(infrastructureType.map(item => [item.id, item]))
