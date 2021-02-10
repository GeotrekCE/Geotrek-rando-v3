import { STRUCTURE_ID } from '../constant';
import { FilterWithoutType } from '../interface';
import { RawStructure } from './interface';

export const adaptStructureFilter = (rawStructures: RawStructure[]): FilterWithoutType => ({
  id: STRUCTURE_ID,
  options: rawStructures.map(rawStructure => ({
    value: `${rawStructure.id}`,
    label: rawStructure.name,
  })),
});
