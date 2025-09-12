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
      <div className="flex items-center gap-3">
        <Link href="/cards">
          <img
            src="/icons/search.png"
            alt="search icon"
            width={30}
            height={30}
            onClick={submitSearch}
            className="cursor-pointer dark:opacity-90"
          />
        </Link>

        <ThemeToggle />
      </div>
    </div>
  );
}
