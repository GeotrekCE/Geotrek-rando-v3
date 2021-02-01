import { ChevronDown } from 'components/Icons/ChevronDown';
import { Heart } from 'components/Icons/Heart';
import Dropdown from 'react-dropdown';
import ReactCountryFlag from 'react-country-flag';
import { useIntl } from 'react-intl';
export interface InlineMenuProps {
  className?: string;
  shouldDisplayFavorites: boolean;
  sections: {
    name: string;
    url: string;
  }[];
  subSections: {
    name: string;
    url: string;
  }[];
  supportedLanguages: string[];
}

const InlineMenu: React.FC<InlineMenuProps> = ({
  className,
  sections,
  subSections,
  shouldDisplayFavorites,
  supportedLanguages,
}) => {
  const intl = useIntl();
  return (
    <div className={className}>
      {sections.map(({ name, url }) => (
        <Section name={name} key={name} url={url} />
      ))}
      <Dropdown
        options={subSections.map(({ name, url }) => ({
          value: url,
          label: name,
          className: optionClassName,
        }))}
        controlClassName={controlClassName}
        menuClassName={menuClassName}
        arrowClosed={<ArrowMenu />}
        arrowOpen={<ArrowMenu />}
        value={{
          label: intl.formatMessage({ id: 'header.seeMore' }),
          value: '',
        }}
        onChange={(option: { value: string | undefined }) => {
          window.open(option.value);
        }}
      />
      {shouldDisplayFavorites && (
        <div className="flex items-center text-white">
          <Heart size={16} className="mr-2" />
          <Section name={intl.formatMessage({ id: 'header.favorites' })} />
        </div>
      )}
      <div className="flex items-center text-white" key="language">
        <ReactCountryFlag countryCode="FR" className="mr-2" svg />
        <Dropdown
          options={supportedLanguages.map(language => ({
            value: language,
            label: language.toUpperCase(),
            className: optionClassName,
          }))}
          value={supportedLanguages[0]}
          controlClassName={controlClassName}
          menuClassName={menuClassName}
          arrowClosed={<ArrowMenu />}
          arrowOpen={<ArrowMenu />}
        />
      </div>
    </div>
  );
};

const menuClassName =
  'bg-white text-greyDarkColored rounded-2xl border border-solid border-greySoft overflow-hidden absolute py-2';

const controlClassName = 'pt-4 pb-2 mb-2 mr-1 text-white cursor-pointer flex items-center';

const optionClassName = 'hover:bg-greySoft-light focus:bg-greySoft cursor-pointer px-5 py-2';

const ArrowMenu: React.FC = () => <ChevronDown className="ml-1" size={24} />;

const Section: React.FC<{ name: string; url?: string }> = ({ name, url }) => (
  <div
    className="pt-3 pb-2 mr-2 text-white
    border-b-4 hover:border-white border-transparent border-solid
    cursor-pointer duration-500 transition-all"
  >
    {url !== undefined ? <a href={url}>{name}</a> : name}
  </div>
);

export default InlineMenu;
