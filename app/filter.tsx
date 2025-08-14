import Image from "next/image";

export const FilterRarity = ({ num, src }: { num: number; src: string }) => {
  switch (num) {
    case 4:
      return (
        <>
          <div className="flex my-1">
            <Image src={src} height={30} width={15} alt="rarity image" />
            <Image src={src} height={30} width={15} alt="rarity image" />
            <Image src={src} height={30} width={15} alt="rarity image" />
            <Image src={src} height={30} width={15} alt="rarity image" />
          </div>
        </>
      );
    case 3:
      return (
        <>
          <div className="flex my-1">
            <Image src={src} height={30} width={15} alt="rarity image" />
            <Image src={src} height={30} width={15} alt="rarity image" />
            <Image src={src} height={30} width={15} alt="rarity image" />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div className="flex my-1">
            <Image src={src} height={30} width={15} alt="rarity image" />
            <Image src={src} height={30} width={15} alt="rarity image" />
          </div>
        </>
      );
    case 1:
      return (
        <>
          <div>
            <Image src={src} height={30} width={15} alt="rarity image" />
          </div>
        </>
      );
  }
};

export const FilterEnergy = ({ src, name }: { src: string; name: string }) => {
  return (
    <>
      <div className="flex my-1">
        <Image src={src} height={15} width={22} alt="energy image" />
        <h1 className="font-bold pl-2">{name}</h1>
      </div>
    </>
  );
};
