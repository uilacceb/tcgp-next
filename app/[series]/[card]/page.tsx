// app/[series]/[card]/page.tsx
import { fetchCard } from "@/app/lib/pokemonStore";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ series: string; card: string }>;
};

export default async function CardPage({ params }: PageProps) {
  const { series, card } = await params;
  const seriesId = series.toLowerCase();

  const item = await fetchCard(seriesId, card); // O(1) Map lookup
  if (!item) return notFound();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Image
        src={item.image}
        alt={item.name}
        width={400}
        height={560}
        className="aspect-[7/10] rounded-lg"
      />
      <h1 className="mt-4 text-2xl font-semibold">{item.name}</h1>
      {/* more fields... */}
    </main>
  );
}
