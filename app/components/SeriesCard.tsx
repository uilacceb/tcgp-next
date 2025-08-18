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
    <Link href={`/${series}`} className="block">
      <div
        className=" p-6 flex flex-col items-center gap-4
                   border border-slate-200 shadow-2xl rounded-4xl
                   aspect-[3/4] overflow-hidden"
      >
        {/* Top: logo + name */}
        <div className="flex-1 w-full flex flex-col items-center justify-between">
          <Image
            src={logoURL}
            alt={`${name} - logo`}
            width={250}
            height={100}
            className="p-3 max-w-full h-auto object-contain"
          />
          <p className="font-bold text-2xl text-center">{name}</p>
        </div>

        {/* Bottom: packs */}
        <div className="flex-1 w-full flex flex-wrap justify-evenly items-center p-2 gap-2">
          {packURL?.map((pack) => (
            <div key={pack} className="shrink-0">
              <Image
                src={pack}
                alt={`${name} - pack`}
                width={75}
                height={150}
                className="max-w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default SeriesCard;
