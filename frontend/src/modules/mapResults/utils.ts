export const formatLocation = (rawLocation: number[] | null): { x: number; y: number } | null =>
  rawLocation === null
    ? null
    : {
        x: rawLocation[0],
        y: rawLocation[1],
      };

/** Computes the number of pages there will be given the size of one page and total result count */
export const computePageCount = (pageSize: number, resultsCount: number): number => {
  return Math.floor(resultsCount / pageSize) + (resultsCount % pageSize === 0 ? 0 : 1);
};
