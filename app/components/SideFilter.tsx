"use client";
import React from "react";
import { FilterRarity, FilterEnergy } from "../filterUI";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { pokemonDB } from "../lib/pokemonDB";
import Image from "next/image";

type Variant = "desktop" | "mobile";

type Filters = {
  pack?: string;
  rarity?: string;
  energyType?: string;
};
const SideFilter = ({ variant = "desktop" }: { variant?: Variant }) => {
  const { series } = useParams<{ series?: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const container =
    variant === "desktop"
      ? "hidden md:block lg:w-[200px] md:w-[150px] pr-2"
      : "m-0 p-0 mt-[120px]";

  //set up params of the url
  const hrefForFilters = (next: Filters) => {
    // Make a mutable copy of the current URL query params
    const currentParams = new URLSearchParams(searchParams);

    // Helper to set or remove a key
    const setOrDelete = (key: keyof Filters, val?: string) => {
      if (!val) currentParams.delete(key);
      else currentParams.set(key, val);
      /*URLSearchParams: set() method: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set */
    };

    setOrDelete("pack", next.pack);
    setOrDelete("rarity", next.rarity);
    setOrDelete("energyType", next.energyType);

    // Turn the params back into a string like: "pack=Lugia&type=fire"
    const queryString = currentParams.toString();

    // If there are query params, return "/a4?..." else just "/a4"
    return queryString ? `${pathname}?${queryString}` : pathname;
  };
  const serieId = pathname.split("/")[1]; // "A4"
  const serie = pokemonDB.find(
    (s) => s.id.toLowerCase() === serieId.toLowerCase()
  );
  const serieName = serie?.name;

  const getPacks = () => {
    const serie = pokemonDB.find(
      (s) => s.id.toLowerCase() === (series ?? "").toLowerCase()
    );
    return serie?.packs ?? []; // <-- no throw; empty list if invalid
  };

  return (
    <div className={container}>
      <div>
        <h1 className="font-bold text-2xl">Packs</h1>
        <div className="flex justify-start gap-4 pt-2 items-baseline flex-wrap">
          {getPacks()?.map(({ name, src }) => (
            <Link key={name} href={hrefForFilters({ pack: name })}>
              <div className="flex flex-col items-center gap-1 justify-end cursor-pointer jump-on-hover">
                <Image
                  src={src}
                  alt={`${name} - pack`}
                  width={40}
                  height={65}
                />
                <p className="text-sm">{name}</p>
              </div>
            </Link>
          ))}
          {/* Shared, only if there are at least 2 packs */}
          {getPacks().length > 1 && (
            <Link
              href={hrefForFilters({ pack: `Shared(${serieName})` })}
              key="Shared"
            >
              <div className="flex flex-col items-center gap-1 justify-end cursor-pointer">
                <Image
                  src="/packs/shared.png"
                  alt="Shared - pack"
                  width={40}
                  height={65}
                />
                <p className="text-sm">Shared</p>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="pt-4">
        <h1 className="font-bold text-2xl">Rarity</h1>
        {/* diamond */}
        <Link href={hrefForFilters({ rarity: "◊" })}>
          <FilterRarity src="/rarity/diamond.webp" count={1} name="diamond" />
        </Link>
        <Link href={hrefForFilters({ rarity: "◊◊" })}>
          <FilterRarity src="/rarity/diamond.webp" count={2} name="diamond" />
        </Link>
        <Link href={hrefForFilters({ rarity: "◊◊◊" })}>
          <FilterRarity src="/rarity/diamond.webp" count={3} name="diamond" />
        </Link>
        <Link href={hrefForFilters({ rarity: "◊◊◊◊" })}>
          <FilterRarity src="/rarity/diamond.webp" count={4} name="diamond" />
        </Link>

        {/* stars */}
        <Link href={hrefForFilters({ rarity: "☆" })}>
          <FilterRarity
            src="/rarity/star.webp"
            count={1}
            width={18}
            height={18}
            name="star"
          />
        </Link>
        <Link href={hrefForFilters({ rarity: "☆☆" })}>
          <FilterRarity
            src="/rarity/star.webp"
            count={2}
            name="star"
            width={18}
            height={18}
          />
        </Link>
        <Link href={hrefForFilters({ rarity: "☆☆☆" })}>
          <FilterRarity
            src="/rarity/star.webp"
            count={3}
            name="star"
            width={18}
            height={18}
          />
        </Link>

        {/* shining */}
        <Link href={hrefForFilters({ rarity: "✵" })}>
          <FilterRarity
            src="/rarity/shiny.webp"
            count={1}
            name="shining"
            width={18}
            height={18}
          />
        </Link>
        <Link href={hrefForFilters({ rarity: "✵✵" })}>
          <FilterRarity
            src="/rarity/shiny.webp"
            count={2}
            name="shining"
            width={18}
            height={18}
          />
        </Link>

        {/* crown */}
        <Link href={hrefForFilters({ rarity: "♕" })}>
          <FilterRarity
            src="/rarity/crown.webp"
            count={1}
            name="crown"
            width={23}
            height={18}
          />
        </Link>
      </div>
      <div className="pt-4">
        <h1 className="font-bold text-2xl">Energy type</h1>
        <Link href={hrefForFilters({ energyType: "darkness" })}>
          <FilterEnergy src="/type/darkness.webp" name="darkness" />
        </Link>
        <Link href={hrefForFilters({ energyType: "colorless" })}>
          <FilterEnergy src="/type/colorless.webp" name="colorless" />
        </Link>
        <Link href={hrefForFilters({ energyType: "dragon" })}>
          <FilterEnergy src="/type/dragon.webp" name="dragon" />
        </Link>
        <Link href={hrefForFilters({ energyType: "fighting" })}>
          <FilterEnergy src="/type/fighting.webp" name="fighting" />
        </Link>
        <Link href={hrefForFilters({ energyType: "fire" })}>
          <FilterEnergy src="/type/fire.webp" name="fire" />
        </Link>
        <Link href={hrefForFilters({ energyType: "grass" })}>
          <FilterEnergy src="/type/grass.webp" name="grass" />
        </Link>
        <Link href={hrefForFilters({ energyType: "lightning" })}>
          <FilterEnergy src="/type/lightning.webp" name="lightning" />
        </Link>
        <Link href={hrefForFilters({ energyType: "metal" })}>
          <FilterEnergy src="/type/metal.webp" name="metal" />
        </Link>
        <Link href={hrefForFilters({ energyType: "psychic" })}>
          <FilterEnergy src="/type/psychic.webp" name="psychic" />
        </Link>
        <Link href={hrefForFilters({ energyType: "water" })}>
          <FilterEnergy src="/type/water.webp" name="water" />
        </Link>
      </div>
    </div>
  );
};

export default SideFilter;
