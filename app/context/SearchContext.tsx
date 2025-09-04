"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Pokemon } from "../fetchPokemons";

export type SearchContextType = {
  filterResult: Pokemon[];
  setFilterResult: (r: Pokemon[]) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [filterResult, setFilterResult] = useState<Pokemon[]>([]);
  return (
    <SearchContext.Provider value={{ filterResult, setFilterResult }}>
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
