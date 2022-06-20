import { ServiceTypeDictionary } from 'modules/serviceType/interface';
import { RawService, Service } from './interface';

export const adaptServices = ({
  rawService,
  serviceTypeDictionary,
}: {
  rawService: RawService[];
  serviceTypeDictionary: ServiceTypeDictionary;
}): Service[] => {
  return rawService.map(service => ({
    id: service.id.toString(),
    geometry: {
      x: service.geometry.coordinates[0],
      y: service.geometry.coordinates[1],
      z: service.geometry.coordinates[2],
    },
    type: serviceTypeDictionary[service.type],
  }));
};
