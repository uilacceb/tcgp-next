"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Pokemon } from "../fetchPokemons";

export type SearchContextType = {
  filterResult: Pokemon[];
  setFilterResult: (r: Pokemon[]) => void;
  userInput: string;
  setUserInput: (p: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [filterResult, setFilterResult] = useState<Pokemon[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  return (
    <SearchContext.Provider
      value={{ filterResult, setFilterResult, userInput, setUserInput }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const filteredPokemon = useContext(SearchContext);
  if (filteredPokemon === null) {
    throw new Error("");
  }
  return filteredPokemon;
}
