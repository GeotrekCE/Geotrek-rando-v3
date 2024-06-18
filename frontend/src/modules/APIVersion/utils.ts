import semver from 'semver';
import { APIVersion } from './interface';

export const isLowerOrEqualCurrentAPIVersion = (
  version: string,
  currentAPIVersion?: APIVersion,
) => {
  try {
    return semver.lte(version, currentAPIVersion?.version as string)
  } catch {
    return null;
  }
};
