import semver from 'semver';
import { APIVersion } from './interface';

export const isUpperOrEqualCurrentAPIVersion = (
  version: string,
  currentAPIVersion?: APIVersion,
) => {
  if (currentAPIVersion === undefined) {
    return null;
  }
  const apiVersion = semver.clean(currentAPIVersion.version);
  return apiVersion === version || semver.gt(version, apiVersion as string);
};
