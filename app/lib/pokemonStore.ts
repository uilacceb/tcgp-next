// lib/pokemonStore.ts
import { cache } from "react";
import { fetchSeries, Pokemon } from "@/app/fetchPokemons";

// Your existing slug maker (adjust as needed)
export const cardIDFromCard = (p: Pokemon) => {
  if (p.id) return p.id.toLowerCase();
  else return "";
};

// Build & cache a Map once per series (persists across requests on the server)
const buildSeriesIndex = cache(async (seriesId: string) => {
  const list = await fetchSeries(seriesId); // 1 fetch per series (cached by Next)
  const map = new Map<string, Pokemon>();
  for (const p of list) map.set(cardIDFromCard(p), p);
  return map;
});

export async function fetchCard(seriesId: string, cardId: string) {
  const idx = await buildSeriesIndex(seriesId);
  return idx.get(cardId.toLowerCase()) ?? null;
}
