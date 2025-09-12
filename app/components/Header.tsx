"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { fetchPokemons, Pokemon } from "../fetchPokemons";
import { useRouter } from "next/navigation";
import { useSearch } from "../context/SearchContext";
import Chatbox from "./ChatBox";

export default function Header() {
  const { filterResult, setFilterResult, setUserInput } = useSearch();
  const [pokemonName, setPokemonName] = useState<string>("");
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
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

  const submitSearch = () => {
    const name = pokemonName.trim();
    if (!name) return; // do nothing if empty
    router.push(`/cards?name=${encodeURIComponent(name)}`); //{encodeURIComponent ensures that if a user types something like pikachu & mew, the URL will still work and Next.js will correctly receive q="pikachu & mew".
    setDropDownOpen(false);
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
      <Link href="/">
        <img
          src="/icons/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer"
        />
      </Link>
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
                setDropDownOpen(true);
                setUserInput(e.target.value);
              }}
              onFocus={() => setDropDownOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitSearch();
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
                onClick={submitSearch}
              />
            </button>
          </div>

          {filterResult.length > 0 && dropDownOpen && (
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
          )}
        </div>
        {/* 
        <button
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
