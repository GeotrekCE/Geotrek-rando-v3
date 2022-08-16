export const uniqBy = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): T[] =>
  Array.isArray(arr)
    ? arr.filter((item, index, self) => index === self.findIndex(y => item[key] === y[key]))
    : [];
