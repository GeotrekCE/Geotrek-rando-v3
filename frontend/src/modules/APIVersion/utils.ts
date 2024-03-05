import { APIVersion } from './interface';

export const isUpperOrEqualCurrentAPIVersion = (
  version: string,
  currentAPIVersion?: APIVersion,
) => {
  if (currentAPIVersion === undefined) {
    return null;
  }
  return (
    version.localeCompare(currentAPIVersion?.version.replace(/\D*$/, ''), undefined, {
      numeric: true,
      sensitivity: 'base',
    }) <= 0
  );
};
