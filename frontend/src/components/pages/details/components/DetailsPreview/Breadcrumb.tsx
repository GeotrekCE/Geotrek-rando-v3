import Link from 'components/Link';
import { Fragment } from 'react';

const Breadcrumb: React.FC<{ breadcrumb: { label: string; link?: string }[] }> = ({
  breadcrumb,
}) => {
  return (
    <div className="mt-2 mb-4 desktop:mt-8 desktop:mb-16 flex flex-wrap items-center text-Mobile-C2">
      {breadcrumb.map(({ label, link }, index) => {
        const separator = index === 0 ? '>>' : '>';
        return (
          <Fragment key={index}>
            <div className="mx-2">{separator}</div>
            {link !== undefined ? (
              <Link href={link} className="text-sm hover:underline">
                {label}
              </Link>
            ) : (
              label
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
