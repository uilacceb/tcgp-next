"use client";
import { useState } from "react";
import SeriesCard from "./components/SeriesCard";
import { pokemonDB, SeriesMeta } from "./lib/pokemonDB";

// Home.tsx
export default function Home() {
  const [result, setResult] = useState<SeriesMeta[]>(pokemonDB);

  const filterSerie = (seriesName: string) => {
    setResult(pokemonDB.filter((s) => s.series === seriesName));
  };

  const seriesFilterButtons = [
    { seriesName: "Series A" },
    { seriesName: "Series B" },
    { seriesName: "Promo" },
  ];

  return (
    <>
      <div className="flex flex-start gap-2 pl-4">
        <button
          className="rounded-xl text-xl font-bold p-3 cursor-pointer bg-[var(--card-background)]  hover:border-2 hover:border-[#001c29] hover:shadow-[5px_5px_5px_rgba(0,0,0,1)] hover:-translate-2   dark:hover:shadow-[5px_5px_5px_#d3d9db] dark:hover:border-1 dark:hover:border-[#d3d9db] lg:w-[120px]"
          onClick={() => setResult(pokemonDB)}
        >
          All
        </button>
        {seriesFilterButtons.map((s) => {
          return (
            <button
              className="rounded-xl text-xl font-bold p-3 cursor-pointer bg-[var(--card-background)]  hover:border-2 hover:border-[#001c29] hover:shadow-[5px_5px_5px_rgba(0,0,0,1)] hover:-translate-2   dark:hover:shadow-[5px_5px_5px_#d3d9db] dark:hover:border-1 dark:hover:border-[#d3d9db] lg:w-[120px]"
              key={s.seriesName}
              onClick={() => filterSerie(s.seriesName)}
            >
              {s.seriesName}
            </button>
          );
        })}
      </div>
      <main
        className="grid gap-6
                 grid-cols-[repeat(auto-fill,minmax(350px,1fr))] px-4 py-5"
      >
        {result.map((p) => (
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
    </>
  );
}
