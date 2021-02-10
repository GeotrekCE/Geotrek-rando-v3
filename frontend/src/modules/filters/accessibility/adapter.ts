import { ACCESSIBILITY_ID } from '../constant';
import { FilterWithoutType } from '../interface';
import { RawAccessibilty } from './interface';

export const adaptAccessibilityFilter = (
  rawAccessibilities: RawAccessibilty[],
): FilterWithoutType => ({
  id: ACCESSIBILITY_ID,
  options: rawAccessibilities.map(rawAccessibilty => ({
    value: `${rawAccessibilty.id}`,
    label: rawAccessibilty.name,
  })),
});
