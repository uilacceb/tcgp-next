// app/cards/CardsClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearch } from "@/app/context/SearchContext";
import { cardIDFromCard } from "@/app/lib/pokemonStore";
import { useSearchParams } from "next/navigation";

export default function CardsClient() {
  const { filterResult } = useSearch();
  const searchParams = useSearchParams();
  const search = searchParams.get("name");

  return (
    <div className="px-6 py-8">
      {filterResult.length === 0 ? (
        <p className="text-sm opacity-70">No results available.</p>
      ) : (
        <>
          <div>
            <h1 className="font-bold text-sm pb-4 md:text-2xl">
              Found {filterResult.length} cards that includes &#39;{search}&#39;
            </h1>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
            {filterResult.map((p) => {
              const serie = p.id.split("-")[0];
              const formattedSeries =
                serie.charAt(0).toUpperCase() + serie.slice(1).toLowerCase();
              const href = `/${formattedSeries}/${cardIDFromCard(p)}`;
              return (
                <div key={p.id}>
                  <div
                    className="relative w-fit group overflow-hidden rounded-[5px] 
              transition-transform duration-500 ease-in-out 
              hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] 
              dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  >
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
                    <Link
                      href={href}
                      className="block group rounded-[5px] overflow-hidden"
                    >
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={140}
                        height={200}
                        loading="lazy"
                        className="aspect-[7/10] md:w-[150px] lg:w-[200px]"
                      />
                    </Link>
                  </div>
                  <div className="mt-1 text-xs max-w-[200px] ">
                    <p className="truncate font-medium md:text-[1rem]">
                      {p.name}
                    </p>
                    <p className="opacity-60 truncate">{formattedSeries}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
