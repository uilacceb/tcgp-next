// app/[series]/[card]/page.tsx
import { pokemonDB } from "@/app/lib/pokemonDB";
import { fetchCard } from "@/app/lib/pokemonStore";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ series: string; card: string }>;
};

export default async function CardPage({ params }: PageProps) {
  const { series, card } = await params;
  const seriesId = series.toLowerCase();

  console.log(seriesId);

  const item = await fetchCard(seriesId, card); // O(1) Map lookup
  if (!item) return notFound();

  const fetchPacksOfSeries = () => {
    const serie = pokemonDB.find(
      (s) => s.id.toLowerCase() === seriesId.toLowerCase()
    );
    return serie?.packs ?? [];
  };

  const norm = (s = "") =>
    s
      .toLowerCase() // 1) ignore case differences
      .normalize("NFKD") // 2) split letters and accents (Unicode)
      .replace(/[\u0300-\u036f]/g, "") // 3) drop the accent marks
      .replace(/[^a-z0-9]/g, ""); // 4) remove everything not a–z or 0–9

  const fetchFinalPacks = () => {
    const packsOfSeries = fetchPacksOfSeries();
    const packName = item.pack ?? "";
    const isShared = norm(packName).includes("shared");
    if (isShared) return packsOfSeries;

    const target = norm(packName);
    return packsOfSeries.filter((p) => norm(p.name) === target);
  };

  const finalPacks = fetchFinalPacks();
  console.log("final pack", finalPacks);
  return (
    <main className="md:flex md:justify-center md:items-center md:pt-8">
      <div className="flex justify-center items-center ">
        <Image
          src={item.image}
          alt={item.name}
          width={280}
          height={380}
          className="aspect-[7/10] rounded-lg md:w-[400px]"
        />
      </div>
      <div className="md:px-8 md:flex md:flex-col md:justify-center">
        <div>
          <h1 className="font-bold p-2 text-center md:text-3xl md:pb-6">
            From pack&#40;s&#41;
          </h1>
        </div>
        <div className="flex justify-center gap-4 items-center">
          {finalPacks.map((fp) => (
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
      </div>
    </main>
  );
}
