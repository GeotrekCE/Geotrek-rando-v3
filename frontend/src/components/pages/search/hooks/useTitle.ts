import { FilterState } from 'modules/filters/interface';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

export const useTitle = (filtersState: FilterState[], searchResults = 0) => {
  const intl = useIntl();
  const { query } = useRouter();
  const filters = filtersState.flatMap(item => {
    if (item.selectedOptions.length > 0) {
      return {
        label: item.label,
        options: item.selectedOptions.map(({ label }) => label),
      };
    }
    return [];
  });

  const categoryNumber = filters.length;

  const category = categoryNumber ? intl.formatMessage({ id: filters[0].label }) ?? '' : '';
  const options = categoryNumber
    ? intl.formatList(filters[0].options, { type: 'conjunction' }) ?? ''
    : '';

  const getPageTitle = () => {
    const localePage = intl.formatMessage(
      { id: 'search.titlePagination' },
      { count: Number(query.page ?? 1) },
    );

    if (categoryNumber === 0) {
      return `${intl.formatMessage({ id: 'search.title' })}${localePage}`;
    }
    if (categoryNumber === 1) {
      return `${intl.formatMessage(
        { id: 'search.titleWithOneCategory' },
        { category, options: options as string },
      )}${localePage}`;
    }
    return `${intl.formatMessage(
      { id: 'search.resultsFound' },
      { count: searchResults },
    )}${localePage}`;
  };

  const getResultsTitle = () => {
    if (categoryNumber !== 1) {
      return intl.formatMessage({ id: 'search.resultsFound' }, { count: searchResults });
    }
    const results = intl.formatMessage(
      { id: 'search.resultsFoundShort' },
      {
        count: searchResults,
      },
    );

    const content = intl.formatMessage(
      { id: 'search.titleWithOneCategory' },
      { category: category.toLowerCase(), options },
    ) as string;

    return `${results} ${content}`;
  };

  return {
    pageTitle: getPageTitle(),
    resultsTitle: getResultsTitle(),
  };
};
