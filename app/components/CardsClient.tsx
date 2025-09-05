"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useEffect, useState } from "react";
import { useSearch } from "@/app/context/SearchContext";
import { cardIDFromCard } from "@/app/lib/pokemonStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CardsClient() {
  const { filterResult, userInput } = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [timedOut, setTimedOut] = useState<boolean>(false);

  useEffect(() => {
    if (!!userInput?.trim() && filterResult.length === 0) {
      // Start 2s timer
      const id = setTimeout(() => setTimedOut(true), 2000);
      return () => clearTimeout(id); // cleanup if query changes
    } else {
      // Reset when not searching
      setTimedOut(false);
    }
  }, [userInput, filterResult.length]);

  // Keep the URL in sync with the live user input while on /cards
  useEffect(() => {
    if (pathname !== "/cards") return;

    const q = (userInput ?? "").trim();
    const current = (params.get("name") ?? "").trim();

    // if (!q) {
    //   router.replace("/", { scroll: false });
    //   return;
    // }

    if (q !== current) {
      router.replace(`/cards?name=${encodeURIComponent(q)}`, { scroll: false });
    }
  }, [userInput, pathname, params, router]);

  //when there is an input but results haven't arrived yet,
  const q = (userInput ?? "").trim();
  const isSearching = !!q && filterResult.length === 0 && !timedOut;
  const noResults = !!q && filterResult.length === 0 && timedOut;

  const count = filterResult.length;

  return (
    <div className="px-6 py-8">
      {isSearching ? (
        <p className="text-sm opacity-70">Searching…</p>
      ) : noResults ? (
        <p className="text-sm opacity-70">No results available.</p>
      ) : (
        <>
          <div>
            <h1 className="font-bold text-sm pb-4 md:text-2xl">
              Found {count} cards that include &#39;{userInput}&#39;
            </h1>
          </div>

          {/* RENDER THE STORE DIRECTLY: updates on every keystroke */}
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
