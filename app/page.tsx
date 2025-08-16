import SeriesCard from "./components/SeriesCard";
import { pokemonDB } from "./lib/pokemonDB";

export default async function Home() {
  return (
    <main className="grid lg:grid-cols-4 lg:gap-6 md:grid-cols-2 md:gap-4 gap-2 justify-center items-center">
      {pokemonDB.map((p) => {
        return (
          <>
            <SeriesCard
              series={p.id}
              name={p.name}
              logoURL={p.logoURL}
              packURL={p.packs.map((pack) => pack.src)}
            />
          </>
        );
      })}
    </main>
  );
}
