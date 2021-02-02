/** Computes the number of pages there will be given the size of one page and total result count */
export const computePageCount = (pageSize: number, resultsCount: number): number => {
  return Math.floor(resultsCount / pageSize) + (resultsCount % pageSize === 0 ? 0 : 1);
};

/** Generates an array with the numbers of the pages in it */
export const generatePageNumbersArray = (pageSize: number, resultsCount: number): number[] => {
  return Array.from(Array(computePageCount(pageSize, resultsCount)), (e, i) => i + 1);
};
