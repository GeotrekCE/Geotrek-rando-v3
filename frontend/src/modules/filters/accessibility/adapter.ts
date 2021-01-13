import { Filter } from '../interface';
import { RawAccessibilty } from './interface';

export const adaptAccessibilityFilter = (rawAccessibilities: RawAccessibilty[]): Filter => ({
  id: 'accessibility',
  options: rawAccessibilities.map(rawAccessibilty => ({
    value: `${rawAccessibilty.id}`,
    label: rawAccessibilty.name,
  })),
});
