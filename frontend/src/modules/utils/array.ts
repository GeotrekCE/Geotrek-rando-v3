interface ItemWithOrder {
  order?: null | number;
}

export const uniqBy = <T extends Record<K, string>, K extends keyof T>(arr: T[], key: K): T[] =>
  Array.isArray(arr)
    ? arr.filter((item, index, self) => index === self.findIndex(y => item[key] === y[key]))
    : [];

const crawlObjectWithString = <T extends Record<string, any>>(obj: T, key: string) => {
  const value = key.split('.').reduce((list, item) => (item in list ? list[item] : list), obj);
  return typeof value === 'string' ? value : 'undefined';
};
export const groupBy = <T extends Record<string, any>>(
  arr: T[],
  key: string,
): Record<string, T[]> =>
  arr.reduce(
    (acc, item) => (
      (acc[crawlObjectWithString(item, key)] = [
        ...(acc[crawlObjectWithString(item, key)] || []),
        item,
      ]),
      acc
    ),
    {} as Record<string, T[]>,
  );

export const sortedByOrder = (a: ItemWithOrder, b: ItemWithOrder) =>
  (a.order ?? Infinity) - (b.order ?? Infinity);
