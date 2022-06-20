import { ServiceType, ServiceTypeDictionary } from './interface';
export const adaptServiceType = (serviceType: ServiceType[]): ServiceTypeDictionary => {
  return serviceType.reduce(
    (list, item) => ({
      ...list,
      [item.id]: item,
    }),
    {},
  );
};
