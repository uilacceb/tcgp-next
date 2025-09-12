"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { fetchPokemons, Pokemon } from "../fetchPokemons";
import { useRouter } from "next/navigation";
import { useSearch } from "../context/SearchContext";

export default function SearchInputBox() {
  const { filterResult, setFilterResult, setUserInput } = useSearch();
  const [pokemonName, setPokemonName] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    filterName();
  }, [pokemonName]);

  const router = useRouter();

  const filterName = async () => {
    const name = pokemonName.trim().toLowerCase();
    if (!name) {
      // ⬅️ IMPORTANT
      setFilterResult([]); // keep context empty when no query
      return;
    }
    const allPokemon = await fetchPokemons();
    const filtered = allPokemon.filter((p) =>
      p.name.toLowerCase().includes(name)
    );
    setFilterResult(filtered);
  };

  useEffect(() => {
    const id = setTimeout(filterName, 200); // debounce optional
    return () => clearTimeout(id);
  }, [pokemonName]);

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0
                    bg-[#d3d9db] dark:bg-[#001c29] z-[1000]"
    >
      <div className="flex gap-2 items-center">
        <div ref={containerRef} className="relative">
          <div className="relative w-full max-w-sm">
            <input
              ref={inputRef}
              type="search"
              className="w-full border-2 border-gray-400 h-10 pr-10 pl-3 rounded-full
               bg-[#f1f1f1] text-zinc-900 dark:text-zinc-900"
              placeholder="Search pokemon"
              value={pokemonName}
              onChange={(e) => {
                setPokemonName(e.target.value);

                setUserInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  inputRef.current?.blur(); //close keyboard
                }
              }}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              aria-label="Search"
            >
              <img
                src="/icons/search.png"
                alt="search icon"
                width={18}
                height={18}
              />
            </button>
          </div>

          {/* {filterResult.length > 0 && dropDownOpen && (
            <ul className="absolute z-10 w-full p-2 max-h-120 overflow-auto bg-white text-black dark:bg-[#0d2f3f] dark:text-white rounded-2xl">
              {filterResult.map((f) => {
                const serie = f.id.split("-")[0];
                const formattedSeries =
                  serie.charAt(0).toUpperCase() + serie.slice(1).toLowerCase();
                return (
                  <Link
                    onClick={() => setDropDownOpen(false)}
                    key={f.id}
                    href={`/${formattedSeries}/${f.id}`}
                  >
                    <li className="flex justify-between px-2 py-3 items-center cursor-pointer">
                      <p>{f.name}</p>
                      <Image
                        src={f.image}
                        alt={f.name}
                        width={50}
                        height={50}
                      />
                    </li>
                  </Link>
                );
              })}
            </ul>
          )} */}
        </div>
      </div>
    </div>
  );
}
