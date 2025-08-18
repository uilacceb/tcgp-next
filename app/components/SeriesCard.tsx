import Image from "next/image";
import Link from "next/link";
import React from "react";

const SeriesCard = ({
  name,
  logoURL,
  packURL,
  series,
}: {
  name: string;
  logoURL: string;
  packURL?: string[];
  series: string;
}) => {
  return (
    <Link href={`/${series}`}>
      <div className="w-[300px] lg:w-[400px] p-6 flex flex-col items-center gap-4 border border-slate-200 shadow-2xl rounded-4xl h-[400px]">
        {/* Top: logo + name */}
        <div className="flex-1 w-full flex flex-col items-center justify-between ">
          <Image
            src={logoURL}
            alt={`${name} - logo`}
            width={250}
            height={100}
            className=" p-3"
          />
          <p className="font-bold text-[18px] text-center">{name}</p>
        </div>

        {/* Bottom: packs */}
        <div className="flex-1 w-full flex justify-evenly items-center p-2 ">
          {packURL?.map((pack) => (
            <div key={pack}>
              <Image
                src={pack}
                alt={`${name} - pack`}
                width={75}
                height={150}
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default SeriesCard;
