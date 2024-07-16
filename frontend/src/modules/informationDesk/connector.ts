import { generatePageNumbersArray } from 'modules/utils/connector';
import { concatResults } from 'modules/utils/adapter';
import { adaptInformationDesks } from './adapter';
import { fetchInformationDesks } from './api';
import { InformationDeskDictionnary } from './interface';

const defaultPageSize = 50;

export const getInformationDesks = async (
  language: string,
): Promise<InformationDeskDictionnary> => {
  try {
    // First call to get the count of result - actual result size is limited by page_size
    const rawInformationDesks = await fetchInformationDesks({
      language,
      page_size: defaultPageSize,
    });
    if (rawInformationDesks.count <= defaultPageSize) {
      return adaptInformationDesks(
        rawInformationDesks.results,
      );
    }

    // Second call with loop to load all the necessary pages to reach the count
    const rawInformationDesksOtherPages = await Promise.all(
      generatePageNumbersArray(defaultPageSize, rawInformationDesks.count)
        .slice(1)
        .map(pageNumber =>
          fetchInformationDesks({
            language,
            page_size: defaultPageSize,
            page: pageNumber,
          }),
        ),
    );

    return adaptInformationDesks(concatResults([rawInformationDesks, ...rawInformationDesksOtherPages]));
  } catch (e) {
    console.error('Error in informationDesk/connector', e);
    throw e;
  }
};
