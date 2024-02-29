import { Arrow } from 'components/Icons/Arrow';
import { ArrowLeft } from 'components/Icons/ArrowLeft';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';

interface PaginationProps {
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({ hasPreviousPage, hasNextPage }) => {
  const router = useRouter();
  const intl = useIntl();
  const page = Number(router.query.page ?? 1);

  if (hasPreviousPage === false && hasNextPage === false) {
    return null;
  }

  const queryForPreviousPage = { ...router.query, page: page - 1 };
  if (queryForPreviousPage.page === 1) {
    // @ts-expect-error: Unreachable code error
    delete queryForPreviousPage.page;
  }

  return (
    <nav role="navigation" className="flex justify-center items-center gap-3">
      {hasPreviousPage === true && (
        <Link
          className="flex items-center px-2 py-2 border border-solid border-greySoft hover:text-primary1 hover:border-primary1 rounded-md transition"
          href={{
            pathname: router.pathname,
            query: queryForPreviousPage,
          }}
          rel="prev"
          shallow
          title={intl.formatMessage({ id: 'search.pagination.goto' }, { count: page - 1 })}
        >
          <ArrowLeft size={20} className="mr-2" />
          <FormattedMessage id="search.pagination.previous" />
        </Link>
      )}
      {hasNextPage === true && (
        <Link
          className="flex items-center px-2 py-2 border border-solid border-greySoft hover:text-primary1 hover:border-primary1 rounded-md transition"
          href={{
            pathname: router.pathname,
            query: { ...router.query, page: page + 1 },
          }}
          rel="next"
          shallow
          title={intl.formatMessage({ id: 'search.pagination.goto' }, { count: page + 1 })}
        >
          <FormattedMessage id="search.pagination.next" />
          <Arrow size={20} className="ml-2" />
        </Link>
      )}
    </nav>
  );
};
