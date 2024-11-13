import { Download } from 'components/Icons/Download';

interface DetailsButtonDropdownProps {
  options: {
    value?: string;
    label: string;
    size: number;
  }[];
  children: React.ReactNode;
}

export const DetailsButtonDropdown: React.FC<DetailsButtonDropdownProps> = ({
  options,
  children,
}) => {
  return (
    <details className="size-12 rounded-full shadow-lg bg-white">
      <summary className="size-full cursor-pointer grid place-items-center list-none">
        {children}
      </summary>
      <ul className="bg-white text-greyDarkColored rounded-lg shadow-sm text-P2 overflow-hidden absolute py-2 -ml-8 menu-download">
        {options
          .filter(({ value }) => Boolean(value))
          .map(option => (
            <li
              className="hover:bg-greySoft-light focus:bg-greySoft cursor-pointer px-5 py-2 leading-3"
              key={option.label}
            >
              <a href={option.value} className="flex items-center">
                <Download className="text-primary1 m-2" size={option.size} /> {option.label}
              </a>
            </li>
          ))}
      </ul>
    </details>
  );
};
