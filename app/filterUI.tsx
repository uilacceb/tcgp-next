"use client";
import Image from "next/image";

type RarityProps = {
  name: string;
  count: number;
  src: string;
  width?: number;
  height?: number;
};

export const FilterRarity = ({
  name,
  count,
  src,
  width = 15,
  height = 30,
}: RarityProps) => {
  return (
    <div className="flex py-2 my-1 border-b-1 border-[#e3e3e3] cursor-pointer ">
      <div className="flex jump-on-hover w-full">
        {Array.from({ length: count }).map((_, i) => (
          <Image
            key={i}
            src={src}
            width={width}
            height={height}
            alt={`${name} - logo`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};

export const FilterEnergy = ({ src, name }: { src: string; name: string }) => {
  return (
    <>
      <div className="flex my-1 py-2 border-b-1 border-[#e3e3e3] cursor-pointer">
        <div className="flex w-full jump-on-hover">
          <Image src={src} height={15} width={22} alt="energy image" />
          <h1 className="font-bold pl-2">{name}</h1>
        </div>
      </div>
    </>
  );
};

export const raritySymbolToName: Record<string, string> = {
  "♕": "crown",

  "◊": "diamond",

  "☆": "star",

  "✵": "shiny",

  Promo: "promo",
};

type RarityIconsProps = {
  name: string;
  rarity: string; // e.g. "◊◊" or "♕"
  width?: number;
  height?: number;
};

export const rarityImages: Record<string, string> = {
  crown: "/rarity/crown.webp",
  diamond: "/rarity/diamond.webp",
  shiny: "/rarity/shiny.webp",
  star: "/rarity/star.webp",
  promo: "/rarity/promo.png",
};

function normalizeRarity(rarityRaw?: string | null): {
  name: string;
  count: number;
} {
  if (!rarityRaw) return { name: "star", count: 1 };

  const trimmed = rarityRaw.trim();
  if (!trimmed) return { name: "star", count: 1 };

  // If it's already a word like "promo", "star", etc.
  const asName = trimmed.toLowerCase();
  const directNames: Record<string, string> = {
    crown: "crown",
    diamond: "diamond",
    shiny: "shiny",
    star: "star",
    promo: "promo",
  };
  if (directNames[asName]) return { name: directNames[asName], count: 1 };

  // Otherwise treat as symbols (e.g. "◊◊")
  const glyphs = Array.from(trimmed);
  const firstGlyph = glyphs[0];
  const name = raritySymbolToName[firstGlyph] ?? "star";
  return { name, count: glyphs.length };
}

export function RarityIcons({
  name,
  rarity,
  width = 20,
  height = 35,
}: RarityIconsProps) {
  const { name: rarityName, count } = normalizeRarity(rarity);

  if (rarityName === "promo") {
    return (
      <span className="select-none font-bold text-zinc-700 dark:text-zinc-300">
        N/A
      </span>
    );
  }
  const src = rarityImages[rarityName];

  return (
    <div className="flex w-full">
      {Array.from({ length: count }).map((_, i) => (
        <Image
          key={i}
          src={src}
          width={width}
          height={height}
          alt={`${name} - ${rarityName}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
