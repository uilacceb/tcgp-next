import { fetchPokemons } from "./fetchPokemons";

export const filterName = async () => {
  const allPokemon = await fetchPokemons();
};
