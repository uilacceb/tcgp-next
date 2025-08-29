import Image from "next/image";
import { fetchSeries, Pokemon } from "../fetchPokemons";
import SideFilter from "../components/SideFilter";
import { pokemonDB } from "../lib/pokemonDB";
import MobileFilters from "../components/MobileFilters";
// import SingleCardInfo from "../components/SingleCardInfo";
import Link from "next/link";
import { cardIDFromCard } from "../lib/pokemonStore";

type PageProps = {
  params: Promise<{ series: string }>; // "A4", "A3b", ...
  searchParams: Promise<{
    pack?: string;
    rarity?: string;
    energyType?: string;
  }>;
};

export default async function SeriesPage({ params, searchParams }: PageProps) {
  const { series } = await params;
  const { pack, rarity, energyType } = await searchParams;

  const seriesId = series?.toLowerCase();
  const cards: Pokemon[] = await fetchSeries(seriesId);

  // find current series meta to know how many packs it has
  const serieMeta = pokemonDB.find((s) => s.id.toLowerCase() === seriesId);
  const hasMultiplePacks = (serieMeta?.packs?.length ?? 0) > 1;

  const packLocalized = pack?.toLowerCase();
  const energyLocalized = energyType?.toLowerCase();

  const filtered = cards.filter((p) => {
    const cardPack = p.pack.toLowerCase();
    //If pack is defined (meaning you clicked a pack in the SideFilter):
    if (packLocalized) {
      // If the series has only one pack, selecting it should not exclude anything, This means: “Let this card through no matter what”.
      // Returning true in .filter() keeps the item.So every Pokémon in the series passes the filter.
      if (!hasMultiplePacks) return true;

      // Multi-pack series: selected pack + shared cards
      return cardPack === packLocalized;
    }
    if (energyLocalized) return p.type.toLowerCase() === energyLocalized;
    if (rarity) return p.rarity === rarity;
    return true; // no filter -> show all
  });

  return (
    <div className="flex py-8 px-6">
      <div>
        <SideFilter />
        <MobileFilters />
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6 w-full auto-rows-max ">
        {filtered.length === 0 && (
          <p className="col-span-full text-sm opacity-70">
            No cards match your filter.
          </p>
        )}

        {filtered.map((p) => {
          const card = cardIDFromCard(p);
          const href = `/${series}/${card}`;

          return (
            <div
              key={p.id}
              className="relative w-fit group overflow-hidden rounded-[5px] 
                         transition-transform duration-500 ease-in-out 
                         hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] 
                         dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            >
              {/* Shine layer */}
              <div
                className="absolute top-0 left-0 w-full h-full z-[2] pointer-events-none 
                           before:content-[''] before:absolute before:top-[-50%] before:left-[-50%]
                           before:w-[200%] before:h-[200%]
                           before:rotate-[45deg]
                           before:bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.7),transparent)]
                           before:transition-transform before:duration-700
                           before:opacity-0 group-hover:before:opacity-100 
                           group-hover:before:translate-x-full group-hover:before:translate-y-full"
              />

              <Link href={href}>
                {/* <SingleCardInfo
                  src={p.image}
                  alt={p.name}
                  width={140}
                  height={200}
                  unoptimized
                /> */}
                <img
                  src={p.image}
                  alt={p.name}
                  width={140}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[7/10] md:w-[150px] lg:w-[200px] 
                      relative z-[1]"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
