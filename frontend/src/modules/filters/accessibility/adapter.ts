import { FilterWithoutType } from '../interface';
import { RawAccessibilty } from './interface';

export const adaptAccessibilityFilter = (
  rawAccessibilities: RawAccessibilty[],
): FilterWithoutType => ({
  id: 'accessibility',
  options: rawAccessibilities.map(rawAccessibilty => ({
    value: `${rawAccessibilty.id}`,
    label: rawAccessibilty.name,
  })),
});
