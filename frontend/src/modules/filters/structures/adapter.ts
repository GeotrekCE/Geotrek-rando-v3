import { Filter } from '../interface';
import { RawStructure } from './interface';

export const adaptStructureFilter = (rawStructures: RawStructure[]): Filter => ({
  id: 'structure',
  options: rawStructures.map(rawStructure => ({
    value: `${rawStructure.id}`,
    label: rawStructure.name,
  })),
});
