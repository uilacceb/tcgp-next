import Image from "next/image";
import Link from "next/link";

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
    <main>
      {/* {pokemons.map((p) => (
        <div key={Math.random()}>
          <li key={p.id}>{p.name}</li>
          {/* <Image src={p.image} alt={p.name} width={100} height={170}></Image> */}
      {/* </div>
      ))} */}
      Hello world
    </main>
  );
}
