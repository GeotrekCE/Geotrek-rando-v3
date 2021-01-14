import { ChevronDown } from 'components/Icons/ChevronDown';
import { Heart } from 'components/Icons/Heart';
import Dropdown, { Option } from 'react-dropdown';
import ReactCountryFlag from 'react-country-flag';
export interface InlineMenuProps {
  className?: string;
  sections: string[];
  subSections: { [key: string]: string[] };
}

const InlineMenu: React.FC<InlineMenuProps> = ({ className, sections, subSections }) => {
  return (
    <div className={className}>
      {sections.map(sectionName => {
        switch (sectionName) {
          case 'En savoir plus':
            return (
              <Dropdown
                options={subSections[sectionName].map(getOptionStyled)}
                placeholder={sectionName}
                controlClassName={controlClassName}
                menuClassName={menuClassName}
                arrowClosed={<ArrowMenu />}
                arrowOpen={<ArrowMenu />}
                key={sectionName}
              />
            );
          case 'Langue':
            return (
              <div className="flex items-center text-white" key={sectionName}>
                <ReactCountryFlag countryCode="FR" className="mr-2" svg />
                <Dropdown
                  options={subSections.Langue.map(getOptionStyled)}
                  value={subSections.Langue[0]}
                  controlClassName={controlClassName}
                  menuClassName={menuClassName}
                  arrowClosed={<ArrowMenu />}
                  arrowOpen={<ArrowMenu />}
                />
              </div>
            );
          case 'Favoris':
            return (
              <div className="flex items-center text-white" key={sectionName}>
                <Heart size={16} className="mr-2" />
                <Section name={sectionName} />
              </div>
            );
          default:
            return <Section name={sectionName} key={sectionName} />;
        }
      })}
    </div>
  );
};

const menuClassName =
  'bg-white text-greyDarkColored rounded-2xl border border-solid border-greySoft overflow-hidden absolute py-2';

const controlClassName = 'pt-4 pb-2 mb-2 mr-1 text-white cursor-pointer flex items-center';

const getOptionStyled = (subSection: string): Option => {
  return {
    value: subSection,
    label: subSection,
    className: 'hover:bg-greySoft-light focus:bg-greySoft cursor-pointer px-5 py-2',
  };
};

const ArrowMenu: React.FC = () => <ChevronDown className="ml-1" size={24} />;

const Section: React.FC<{ name: string }> = ({ name }) => (
  <span
    className="pt-3 pb-2 mr-2 text-white
    border-b-4 hover:border-white border-transparent border-solid
    cursor-pointer duration-500 transition-all"
  >
    {name}
  </span>
);

export default InlineMenu;
