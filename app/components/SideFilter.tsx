"use client";
import React from "react";
import { FilterRarity, FilterEnergy, FilterPacks } from "../filter";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const SideFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  type Filters = {
    pack?: string;
    rarity?: string;
    energyType?: string;
  };
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

  return (
    <div className="lg:w-[200px] hidden md:block pr-2">
      <div>
        <h1 className="font-bold text-2xl">Packs</h1>
        <FilterPacks
          packs={[
            { src: "/packs/lugia.webp", name: "Lugia" },
            { src: "/packs/ho-oh.webp", name: "Ho-Oh" },
            { src: "/packs/shared.png", name: "Shared" },
          ]}
        />
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
