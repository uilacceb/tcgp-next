import React from "react";
import { fetchSeries, Pokemon } from "../fetchPokemons";
import Image from "next/image";
import SideFilter from "../components/SideFilter";


type PageProps = {
  searchParams: {
    pack?: string;
    rarity?: string;
    energyType?: string;
  };
};

const A4 = async ({ searchParams }: PageProps) => {
  const a4Pokemons: Pokemon[] = await fetchSeries("a4");
  const pack = searchParams.pack?.toLowerCase();
  const energy = searchParams.energyType?.toLowerCase();
  const rarity = searchParams.rarity;

  const filtered = a4Pokemons.filter((p) => {
    if (pack)   return p.pack.toLowerCase() === pack; 
    if (energy) return p.type.toLowerCase() === energy;
    if (rarity) return p.rarity === rarity;
    return true; // no filter -> show all
  });

  return (
    <div className="flex py-8 px-6">
      <div>
        <SideFilter />
      </div>
      <div className="grid grid-cols-4 justify-center md:grid-cols-6 lg:grid-cols-8">
        {filtered.length === 0 && (
          <p className="col-span-full text-sm opacity-70">
            No cards match your filter.
          </p>
        )}

        {filtered.map((p) => (
          <div key={p.id} className="aspect-[3/4] ">
            <Image
              src={p.image}
              alt={p.name}
              width={100}
              height={175}
              className="w-[100px] h-[175px] md:w-[150px] md:h-auto lg:w-[200px] lg:h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default A4;
