import SeriesCard from "./components/SeriesCard";
import { pokemonDB } from "./lib/pokemonDB";

// Home.tsx
export default async function Home() {
  return (
    //lets the grid choose how many columns fit, wrapping automatically and shrinking each column down to 260px if needed.
    <main
      className="grid gap-6
                 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] px-4 py-5"
    >
      {pokemonDB.map((p) => (
        <div key={p.id} className="min-w-0">
          {/* allow shrinking */}
          <SeriesCard
            series={p.id}
            name={p.name}
            logoURL={p.logoURL}
            packURL={p.packs.map((pack) => pack.src)}
          />
        </div>
      ))}
    </main>
  );
}
