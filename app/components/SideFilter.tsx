import React from "react";
import { FilterRarity, FilterEnergy, FilterPacks } from "../filter";
// import { usePathname, useSearchParams } from "next/navigation";

const SideFilter = () => {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const current = searchParams.get("pack");

  // //set up params of the url
  // const hrefFor = (name?: string) => {
  //   const sp = new URLSearchParams(searchParams);
  //   if (!name) sp.delete("pack"); else sp.set("pack", name);
  //   const qs = sp.toString();
  //   return qs ? `${pathname}?${qs}` : pathname;
  // };
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
        <FilterRarity src="/rarity/diamond.webp" count={1} name="diamond" />
        <FilterRarity src="/rarity/diamond.webp" count={2} name="diamond" />
        <FilterRarity src="/rarity/diamond.webp" count={3} name="diamond" />
        <FilterRarity src="/rarity/diamond.webp" count={4} name="diamond" />

        {/* stars */}
        <FilterRarity
          src="/rarity/star.webp"
          count={1}
          width={18}
          height={18}
          name="star"
        />
        <FilterRarity
          src="/rarity/star.webp"
          count={2}
          name="star"
          width={18}
          height={18}
        />
        <FilterRarity
          src="/rarity/star.webp"
          count={3}
          name="star"
          width={18}
          height={18}
        />

        {/* shining */}
        <FilterRarity
          src="/rarity/shiny.webp"
          count={1}
          name="shining"
          width={18}
          height={18}
        />
        <FilterRarity
          src="/rarity/shiny.webp"
          count={2}
          name="shining"
          width={18}
          height={18}
        />

        {/* crown */}
        <FilterRarity
          src="/rarity/crown.webp"
          count={1}
          name="crown"
          width={23}
          height={18}
        />
      </div>
      <div className="pt-4">
        <h1 className="font-bold text-2xl">Energy type</h1>
        <FilterEnergy src="/type/darkness.webp" name="darkness" />
        <FilterEnergy src="/type/colorless.webp" name="colorless" />
        <FilterEnergy src="/type/dragon.webp" name="dragon" />
        <FilterEnergy src="/type/fighting.webp" name="fighting" />
        <FilterEnergy src="/type/fire.webp" name="fire" />
        <FilterEnergy src="/type/grass.webp" name="grass" />
        <FilterEnergy src="/type/lightning.webp" name="lightning" />
        <FilterEnergy src="/type/metal.webp" name="metal" />
        <FilterEnergy src="/type/psychic.webp" name="psychic" />
        <FilterEnergy src="/type/water.webp" name="water" />
      </div>
    </div>
  );
};

export default SideFilter;
