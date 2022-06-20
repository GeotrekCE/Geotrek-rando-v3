import { InfrastructureTypeDictionary } from 'modules/infrastructureType/interface';
import { Infrastructure, InfrastructureDictionary, RawInfrastructure } from './interface';

const adaptInfrastructure = (
  rawInfrastructure: RawInfrastructure,
  infrastructureTypeDictionary: InfrastructureTypeDictionary,
): Infrastructure => ({
  id: rawInfrastructure.id,
  imageUrl: rawInfrastructure.attachments?.find(({ type }) => type === 'image')?.thumbnail ?? null,
  description: rawInfrastructure.description,
  geometry: rawInfrastructure.geometry,
  name: rawInfrastructure.name,
  type: infrastructureTypeDictionary[rawInfrastructure.type],
});

export const adaptInfrastructures = ({
  rawInfrastructures,
  infrastructureTypeDictionary,
}: {
  rawInfrastructures: RawInfrastructure[];
  infrastructureTypeDictionary: InfrastructureTypeDictionary;
}): InfrastructureDictionary | null => {
  if (rawInfrastructures.length === 0) {
    return null;
  }
  return rawInfrastructures.reduce(
    (Infrastructures, currentInfrastructure) => ({
      ...Infrastructures,
      [currentInfrastructure.id]: adaptInfrastructure(
        currentInfrastructure,
        infrastructureTypeDictionary,
      ),
    }),
    {},
  );
};
