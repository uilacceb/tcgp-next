import React from "react";
import { fetchSeries, fetchPokemons, Pokemon } from "../fetchPokemons";
import Image from "next/image";
import SideFilter from "../components/SideFilter";

const A4 = async () => {
  const a4Pokemons: Pokemon[] = await fetchSeries("a4");

  return (
    <div className="flex py-8 px-6">
      <div>
        <SideFilter />
      </div>
      <div className="grid grid-cols-4 justify-center md:grid-cols-6 lg:grid-cols-8 ">
        {a4Pokemons?.map((p) => (
          <div key={p.id} className="aspect-[3/4] ">
            <Image
              src={p.image}
              alt={p.name}
              width={100}
              height={175}
              className="w-[100px] h-[175px] md:w-[150px] md:h-auto lg:w-[200px] lg:h-auto "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default A4;
