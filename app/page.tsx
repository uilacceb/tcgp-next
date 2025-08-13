import Image from "next/image";
import Link from "next/link";
import SeriesCard from "./components/SeriesCard";

export default async function Home() {
  interface Pokemon {
    id: string;
    name: string;
    rarity: string;
    pack: string;
    image: string;
    type: string;
  }
  const res = await fetch(
    "https://raw.githubusercontent.com/chase-manning/pokemon-tcg-pocket-cards/refs/heads/main/v4.json"
  );
  const pokemons: Pokemon[] = await res.json();
  return (
    <main className="grid lg:grid-cols-4 lg:gap-6 md:grid-cols-2 md:gap-4 gap-2 justify-center items-center">
      <SeriesCard
        name="Wisdom of Sea and Sky"
        logoURL="/series/wisdom of sea and sky series.webp"
        packURL={["/packs/lugia.webp", "/packs/ho-oh.webp"]}
      />
      <SeriesCard
        name="Eevee Grove"
        logoURL="/series/eevee-grove series.webp"
        packURL={["/packs/eevee-grove.webp"]}
      />
      <SeriesCard
        name="Extradimentional Crisis"
        logoURL="/series/extra Dimentional Crisis series.webp"
        packURL={["/packs/extra Dimentional Crisis.webp"]}
      />
      <SeriesCard
        name="Celestial Guardians"
        logoURL="/series/celestial guardians series.webp"
        packURL={["/packs/lunala.webp", "/packs/solgaleo.webp"]}
      />
      <SeriesCard
        name="Shining Revelry"
        logoURL="/series/shining revelry series.webp"
        packURL={["/packs/shining-revelry.webp"]}
      />
      <SeriesCard
        name="Triumphant Light"
        logoURL="/series/triumphant light series.webp"
        packURL={["/packs/triumphant-light.webp"]}
      />
      <SeriesCard
        name="Space-Time Smackdown"
        logoURL="/series/space time smack down series.webp"
        packURL={["/packs/palkia.webp", "/packs/dialga.webp"]}
      />
      <SeriesCard
        name="Mythical Island"
        logoURL="/series/mythical island series.webp"
        packURL={["/packs/mew.webp"]}
      />
      <SeriesCard
        name="Genetic Apex"
        logoURL="/series/genetic apex series.webp"
        packURL={[
          "/packs/pikachu.webp",
          "/packs/charizard.webp",
          "/packs/mewtwo.webp",
        ]}
      />
    </main>
  );
}
