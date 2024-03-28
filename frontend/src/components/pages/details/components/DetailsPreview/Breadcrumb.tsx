import Link from 'components/Link';
import { useIntl } from 'react-intl';
import { cn } from 'services/utils/cn';

interface BreadcrumbProps {
  breadcrumb: { label: string; link?: string }[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb, className }) => {
  const intl = useIntl();
  return (
    <nav
      className={cn(
        'mt-2 mb-4 desktop:mt-8 desktop:mb-16 flex flex-wrap items-center text-Mobile-C2',
        className,
      )}
      aria-label={intl.formatMessage({ id: 'breadcrumb.title' })}
      role="navigation"
    >
      <ol className="flex gap-2">
        {breadcrumb.map(({ label, link }, index) => {
          const separator = index === 0 ? '>>' : '>';
          return (
            <li className="flex items-center gap-2" key={index}>
              <span aria-hidden>{separator}</span>
              {link ? (
                <Link href={link} className="text-sm hover:underline focus:underline">
                  {label}
                </Link>
              ) : (
                <span>{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
