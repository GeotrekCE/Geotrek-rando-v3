import { ServiceType, ServiceTypeDictionary } from './interface';
export const adaptServiceType = (serviceType: ServiceType[]): ServiceTypeDictionary => 
  Object.fromEntries(serviceType.map(item => [item.id, item]));
