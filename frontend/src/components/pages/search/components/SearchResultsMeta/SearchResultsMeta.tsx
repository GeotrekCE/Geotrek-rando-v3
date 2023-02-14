import Image from 'next/image';
interface Props {
  textContent: string;
}

export const SearchResultsMeta: React.FC<Props> = ({ textContent }) => {
  return (
    <div className="flex items-center">
      <div>
        <Image
          loading="lazy"
          className="hidden desktop:block"
          src="/images/little-forest.svg"
          height={64}
          width={64}
          alt=""
        />
      </div>

      <div className="desktop:ml-6">
        <h1 className="font-bold text-2xl color-greyDarkColored desktop:text-3xl">{textContent}</h1>
      </div>
    </div>
  );
};
