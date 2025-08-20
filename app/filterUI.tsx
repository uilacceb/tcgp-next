"use client";
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
    <div className="flex py-2 my-1 border-b-1 border-[#e3e3e3] cursor-pointer ">
      <div className="flex jump-on-hover w-full">
        {Array.from({ length: count }).map((_, i) => (
          <Image
            key={i}
            src={src}
            width={width}
            height={height}
            alt={`${name} - logo`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};

export const FilterEnergy = ({ src, name }: { src: string; name: string }) => {
  return (
    <>
      <div className="flex my-1 py-2 border-b-1 border-[#e3e3e3] cursor-pointer">
        <div className="flex w-full jump-on-hover">
          <Image src={src} height={15} width={22} alt="energy image" />
          <h1 className="font-bold pl-2">{name}</h1>
        </div>
      </div>
    </>
  );
};
