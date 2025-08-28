"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { fetchPokemons, Pokemon } from "../fetchPokemons";

export default function Header() {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [filterResult, setFilterResult] = useState<Pokemon[]>([]);
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    filterName();
  }, [pokemonName]);
  const filterName = async () => {
    const allPokemon = await fetchPokemons();
    const filtered = allPokemon.filter((p) =>
      p.name.toLowerCase().includes(pokemonName.toLowerCase())
    );

    setFilterResult(filtered);
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropDownOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropDownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0
                    bg-[#d3d9db] dark:bg-[#001c29] z-[1000]"
    >
      <Link href="/">
        <Image
          src="/icons/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer"
        />
      </Link>

      <div className="flex gap-2 items-center">
        {/* <div ref={containerRef} className="relative">
          <div className="relative w-full max-w-sm">
            <input
              type="search"
              className="w-full border-2 border-gray-400 h-10 pr-10 pl-3 rounded-full
               bg-[#f1f1f1] text-zinc-900 dark:text-zinc-900"
              placeholder="Search pokemon"
              value={pokemonName}
              onChange={(e) => {
                setPokemonName(e.target.value);
                setDropDownOpen(true);
              }}
              onFocus={() => setDropDownOpen(true)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              aria-label="Search"
            >
              <Image
                src="/icons/search.png"
                alt="search icon"
                width={18}
                height={18}
              />
            </button>
          </div>

          {filterResult.length > 0 && dropDownOpen && (
            <ul className="absolute z-10 w-full p-2 max-h-120 overflow-auto bg-white rounded-2xl">
              {filterResult.map((f) => (
                <li
                  key={f.id}
                  className="flex justify-between px-2 py-3 items-center cursor-pointer"
                >
                  <p>{f.name} </p>
                  <Image src={f.image} alt={f.name} width={50} height={50} />
                </li>
              ))}
            </ul>
          )}
        </div> */}

        {/* <button
          className="p-2 bg-white hover:bg-white cursor-pointer rounded-2xl"
          onClick={filterName}
        >
          Show all
        </button> */}
        <ThemeToggle />
      </div>
    </div>
  );
}
