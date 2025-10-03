// lib/pokemonDB.ts
export type PackMeta = { name: string; src: string };
export type SeriesMeta = {
  id: string; // e.g. "A4"
  name: string; // display name
  logoURL: string;
  packs: PackMeta[]; // 0..n packs
};

export type VideosMeta = {
  id: string;
  url: string;
};

export const pokemonDB: SeriesMeta[] = [
  {
    id: "A4b",
    name: "Deluxe Pack: ex",
    logoURL: "/series/deluxe-pack-ex-series.png",
    packs: [{ name: "Deluxe Pack", src: "/packs/deluxe-pack.png" }],
  },
  {
    id: "A4a",
    name: "Secluded Springs",
    logoURL: "/series/secluded-springs-series.webp",
    packs: [{ name: "Secluded Springs", src: "/packs/secluded-springs.webp" }],
  },
  {
    id: "A4",
    name: "Wisdom of Sea and Sky",
    logoURL: "/series/wisdom-of-sea-and-sky-series.webp",
    packs: [
      { name: "Lugia", src: "/packs/lugia.webp" },
      { name: "Ho-Oh", src: "/packs/ho-oh.webp" },
    ],
  },
  {
    id: "A3b",
    name: "Eevee Grove",
    logoURL: "/series/eevee-grove-series.webp",
    packs: [{ name: "Eevee Grove", src: "/packs/eevee-grove.webp" }],
  },
  {
    id: "A3a",
    name: "Extra Dimensional Crisis",
    logoURL: "/series/extra-Dimensional-Crisis-series.webp",
    packs: [
      {
        name: "Extra Dimensional Crisis",
        src: "/packs/extra-Dimensional-Crisis.webp",
      },
    ],
  },
  {
    id: "A3",
    name: "Celestial Guardians",
    logoURL: "/series/celestial-guardians-series.webp",
    packs: [
      { name: "Lunala", src: "/packs/lunala.webp" },
      { name: "Solgaleo", src: "/packs/solgaleo.webp" },
    ],
  },
  {
    id: "A2b",
    name: "Shining Revelry",
    logoURL: "/series/shining-revelry-series.webp",
    packs: [{ name: "Shining Revelry", src: "/packs/shining-revelry.webp" }],
  },
  {
    id: "A2a",
    name: "Triumphant Light",
    logoURL: "/series/triumphant-light-series.webp",
    packs: [{ name: "Arceus", src: "/packs/triumphant-light.webp" }],
  },
  {
    id: "A2",
    name: "Space-Time Smackdown",
    logoURL: "/series/space-time-smack-down-series.webp",
    packs: [
      { name: "Palkia", src: "/packs/palkia.webp" },
      { name: "Dialga", src: "/packs/dialga.webp" },
    ],
  },
  {
    id: "A1a",
    name: "Mythical Island",
    logoURL: "/series/mythical-island-series.webp",
    packs: [{ name: "Mythical Island", src: "/packs/mew.webp" }],
  },
  {
    id: "A1",
    name: "Genetic Apex",
    logoURL: "/series/genetic-apex-series.webp",
    packs: [
      { name: "Pikachu", src: "/packs/pikachu.webp" },
      { name: "Charizard", src: "/packs/charizard.webp" },
      { name: "Mewtwo", src: "/packs/mewtwo.webp" },
    ],
  },
  {
    id: "PA",
    name: "Promo-A",
    logoURL: "/series/promo-A-series.webp",
    packs: [{ name: "Promo-A", src: "/series/promo-A-series.webp" }],
  },
];

// Helpers
// export const allSeries = () => seriesDb;
// export const getSeriesById = (id: string) =>
//   seriesDb.find(s => s.id.toLowerCase() === id.toLowerCase());
// export const getPacksForSeries = (id: string) =>
//   getSeriesById(id)?.packs ?? [];

export const videoCard: VideosMeta[] = [
  {
    id: "a1-280",
    url: "/videos/charizard-video.mp4",
  },
  {
    id: "a1-281",
    url: "/videos/pikachu-video.mp4",
  },
  {
    id: "a1-282",
    url: "/videos/mewtwo-video.mp4",
  },
  {
    id: "a1-283",
    url: "/videos/mew-video.mp4",
  },
  {
    id: "a1a-085",
    url: "/videos/celebi-video.mp4",
  },
  {
    id: "a2-204",
    url: "/videos/palkia-video.mp4",
  },
  {
    id: "a2-205",
    url: "/videos/dialga-video.mp4",
  },
  {
    id: "a2a-095",
    url: "/videos/arceus-video.mp4",
  },
  {
    id: "a2b-096",
    url: "/videos/giratina-video.mp4",
  },
  {
    id: "a3-208",
    url: "/videos/guzma-video.mp4",
  },
  {
    id: "a3-209",
    url: "/videos/lillie-video.mp4",
  },
  {
    id: "a3a-088",
    url: "/videos/buzzwole-video.mp4",
  },
  {
    id: "a3b-092",
    url: "/videos/eevee-video.mp4",
  },
  {
    id: "a4-210",
    url: "/videos/ho-Oh-video.mp4",
  },
  {
    id: "a4-211",
    url: "/videos/lugia-video.mp4",
  },
  {
    id: "a4a-090",
    url: "/videos/suicune-video.mp4",
  },
];
