export interface Pokemon {
  id: string;
  name: string;
  rarity: string;
  pack: string;
  image: string;
  type: string;
}

export const fetchPokemons = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/uilacceb/simplified-pokemon-api/refs/heads/main/pokemonAPI.json"
  );
  const pokemon: Pokemon[] = await res.json();
  return pokemon;
};

export const fetchSeries = async (seriesNum: string) => {
  const pokemon = await fetchPokemons();
  const a4Pokemon = pokemon.filter((p) => {
    return p.id.split("-")[0] === seriesNum;
  });
  return a4Pokemon;
};
