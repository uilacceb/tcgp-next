import Image from "next/image";
import { fetchSeries, Pokemon } from "../fetchPokemons";
import SideFilter from "../components/SideFilter";
import { pokemonDB } from "../lib/pokemonDB";

type PageProps = {
  params: { series: string }; // "A4", "A3b", ...
  searchParams: {
    pack?: string;
    rarity?: string;
    energyType?: string;
  };
};

export default async function SeriesPage({ params, searchParams }: PageProps) {
  const seriesId = params.series?.toLowerCase();
  const cards: Pokemon[] = await fetchSeries(seriesId);

  // find current series meta to know how many packs it has
  const serieMeta = pokemonDB.find((s) => s.id.toLowerCase() === seriesId);
  const hasMultiplePacks = (serieMeta?.packs?.length ?? 0) > 1;

  const pack = searchParams.pack?.toLowerCase();
  const rarity = searchParams.rarity;
  const energy = searchParams.energyType?.toLowerCase();

  const filtered = cards.filter((p) => {
    const cardPack = p.pack.toLowerCase();
    //If pack is defined (meaning you clicked a pack in the SideFilter):
    if (pack) {
      // If the series has only one pack, selecting it should not exclude anything, This means: “Let this card through no matter what”.
      // Returning true in .filter() keeps the item.So every Pokémon in the series passes the filter.
      if (!hasMultiplePacks) return true;

      // Multi-pack series: selected pack + shared cards
      return cardPack === pack;
    }
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
}
