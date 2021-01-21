export const formatLocation = (rawLocation: number[] | null): { x: number; y: number } | null =>
  rawLocation === null
    ? null
    : {
        x: rawLocation[0],
        y: rawLocation[1],
      };

/** Replace the given url page number by the given page number */
export const generateNextUrl = (url: string, pageNumber: number): string => {
  return url.replace(/page=[0-9]*/, `page=${pageNumber}`);
};

/** Computes the number of pages there will be given the size of one page and total result count */
export const computePageCount = (pageSize: number, resultsCount: number): number => {
  return Math.floor(resultsCount / pageSize) + (resultsCount % pageSize === 0 ? 0 : 1);
};

/** Generate all results pages URLs given the number of pages and an url */
export const generatePagesUrls = (url: string, pageCount: number): string[] => {
  const urls = [];
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
    urls.push(generateNextUrl(url, pageNumber));
  }

  return urls;
};
