// app/[series]/[card]/page.tsx

import BackButton from "@/app/components/BackButton";
import { RarityIcons } from "@/app/filterUI";
import { pokemonDB } from "@/app/lib/pokemonDB";
import { fetchCard } from "@/app/lib/pokemonStore";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ series: string; card: string }>;
};

type Pack = { name: string; src: string };

// Normalize text for safe comparisons (case/accents/punctuation)
const norm = (s = "") =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

// Decide how to show the “pack”: image if it matches a known pack of the series,
// otherwise fall back to showing plain text (e.g., “Missions”, “Wonder Pick”).
function resolvePackDisplay(packNameRaw: string, packsOfSeries: Pack[]) {
  const packName = packNameRaw?.trim() ?? "";
  const target = norm(packName);

  if (!target) return { images: [] as Pack[], text: "—" };

  // special rule: “shared” -> show all packs of this series
  if (target.includes("shared")) return { images: packsOfSeries, text: "" };

  // build index of packs for fast lookup
  const index = new Map<string, Pack>(
    packsOfSeries.map((p) => [norm(p.name), p])
  );
  const hit = index.get(target);

  // if we found a matching pack image, render it; else, show the label as text
  return hit
    ? { images: [hit], text: "" }
    : { images: [] as Pack[], text: packName };
}

export default async function CardPage({ params }: PageProps) {
  const { series, card } = await params;
  const seriesId = series.toLowerCase();

  const item = await fetchCard(seriesId, card); // O(1) Map lookup in your store
  if (!item) return notFound();

  const packsOfSeries: Pack[] =
    pokemonDB.find((s) => s.id.toLowerCase() === seriesId)?.packs ?? [];

  const { images: packImages, text: packText } = resolvePackDisplay(
    item.pack ?? "",
    packsOfSeries
  );

  return (
    <main className="relative pt-10 md:flex md:items-center md:justify-center md:pt-8">
      <div className="absolute left-1 top-0">
        <BackButton />
      </div>

      {/* LEFT: card image */}
      <div className="flex items-center justify-center">
        <Image
          src={item.image}
          alt={item.name}
          width={280}
          height={380}
          className="aspect-[7/10] rounded-lg md:w-[400px]"
        />
      </div>

      {/* RIGHT: info */}
      <div className="md:flex md:flex-col md:justify-center md:px-8">
        <div>
          <h1 className="py-8  text-center text-3xl font-bold md:pb-6 md:pt-2 md:text-4xl">
            Card information:
          </h1>
        </div>

        <div>
          {/* From pack(s) */}
          <div className="flex items-center justify-between gap-4">
            <p className="p-2 text-center font-medium md:pb-6 md:text-3xl">
              From pack(s):
            </p>

            {packImages.length > 0 ? (
              <div className="flex gap-2">
                {packImages.map((fp) => (
                  <Image
                    key={fp.name}
                    src={fp.src}
                    alt={fp.name}
                    width={44}
                    height={77}
                    className="rounded-lg md:w-[80px]"
                  />
                ))}
              </div>
            ) : (
              <span className=" flex justify-between p-2 text-center font-bold md:pb-6 md:text-3xl">
                {packText || "—"}
              </span>
            )}
          </div>

          {/* ID */}
          <div className="flex justify-between p-2 text-center font-bold md:pb-6 md:text-3xl">
            <p className="font-medium">Id: </p>
            <p>{item.id}</p>
          </div>

          {/* Name */}
          <div className="flex justify-between p-2 text-center font-bold md:pb-6 md:text-3xl">
            <p className="font-medium">Name: </p>
            <p>{item.name}</p>
          </div>

          {/* Rarity */}
          <div className="flex items-center justify-between p-2 text-center font-bold md:pb-6 md:text-3xl">
            <p className="font-medium">Rarity: </p>
            <div>
              <RarityIcons name={item.name} rarity={item.rarity} />
            </div>
          </div>

          {/* Type */}
          <div className="flex justify-between p-2 text-center font-bold md:pb-6 md:text-3xl">
            <p className="font-medium">Type:</p>
            <p>{item.type}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
