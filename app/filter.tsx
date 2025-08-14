import Image from "next/image";

type RarityProps = {
  name: string;
  count: number;
  src: string;
  width?: number;
  height?: number;
};

export const FilterRarity = ({
  name,
  count,
  src,
  width = 15,
  height = 30,
}: RarityProps) => {
  return (
    <div className="flex py-2 my-1 border-b-1 border-[#e3e3e3] ">
      {Array.from({ length: count }).map((_, i) => (
        <Image
          key={i}
          src={src}
          width={width}
          height={height}
          alt={`${name} - logo`} // decorative
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export const FilterEnergy = ({ src, name }: { src: string; name: string }) => {
  return (
    <>
      <div className="flex my-1 py-2 border-b-1 border-[#e3e3e3] ">
        <Image src={src} height={15} width={22} alt="energy image" />
        <h1 className="font-bold pl-2">{name}</h1>
      </div>
    </>
  );
};

type Pack = { src: string; name: string };

export const FilterPacks = ({ packs }: { packs: Pack[] }) => {
  return (
    <>
      <div className="flex justify-start gap-4 pt-2">
        {packs.map(({ src, name }) => (
          <div
            key={src}
            className="flex flex-col items-center gap-1 justify-end"
          >
            <Image src={src} alt={`${name} - pack`} width={40} height={65} />
            <p className="text-sm">{name}</p>
          </div>
        ))}
      </div>
    </>
  );
};
