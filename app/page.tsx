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
        series="A4"
        name="Wisdom of Sea and Sky (A4)"
        logoURL="/series/wisdom of sea and sky series.webp"
        packURL={["/packs/lugia.webp", "/packs/ho-oh.webp"]}
      />
      <SeriesCard
        series="A3b"
        name="Eevee Grove (A3b)"
        logoURL="/series/eevee-grove series.webp"
        packURL={["/packs/eevee-grove.webp"]}
      />
      <SeriesCard
        series="A3a"
        name="Extradimentional Crisis (A3a)"
        logoURL="/series/extra Dimentional Crisis series.webp"
        packURL={["/packs/extra Dimentional Crisis.webp"]}
      />
      <SeriesCard
        series="A3"
        name="Celestial Guardians (A3)"
        logoURL="/series/celestial guardians series.webp"
        packURL={["/packs/lunala.webp", "/packs/solgaleo.webp"]}
      />
      <SeriesCard
        series="A2b"
        name="Shining Revelry (A2b)"
        logoURL="/series/shining revelry series.webp"
        packURL={["/packs/shining-revelry.webp"]}
      />
      <SeriesCard
        series="A2a"
        name="Triumphant Light (A2a)"
        logoURL="/series/triumphant light series.webp"
        packURL={["/packs/triumphant-light.webp"]}
      />
      <SeriesCard
        series="A2"
        name="Space-Time Smackdown (A2)"
        logoURL="/series/space time smack down series.webp"
        packURL={["/packs/palkia.webp", "/packs/dialga.webp"]}
      />
      <SeriesCard
        series="A1a"
        name="Mythical Island (A1a)"
        logoURL="/series/mythical island series.webp"
        packURL={["/packs/mew.webp"]}
      />
      <SeriesCard
        series="A1"
        name="Genetic Apex (A1)"
        logoURL="/series/genetic apex series.webp"
        packURL={[
          "/packs/pikachu.webp",
          "/packs/charizard.webp",
          "/packs/mewtwo.webp",
        ]}
      />
      <SeriesCard
        series="PA"
        name="Promo-A (P-A)"
        logoURL="/series/promo A series.webp"
      />
    </main>
  );
}
