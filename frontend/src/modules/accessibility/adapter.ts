import { Accessibility, AccessibilityDictionnary, RawAccessibility } from './interface';

const adaptAccessibility = (rawAccess: RawAccessibility): Accessibility => ({
  name: rawAccess.name,
  id: rawAccess.id,
  pictogramUri: rawAccess.pictogram,
});

export const adaptAccessibilities = (
  rawAccessibilities: RawAccessibility[],
): AccessibilityDictionnary =>
  rawAccessibilities.reduce(
    (accesses, currentAccess) => ({
      ...accesses,
      [`${currentAccess.id}`]: adaptAccessibility(currentAccess),
    }),
    {},
  );
