import Image from "next/image";
import React from "react";
import { FilterRarity, FilterEnergy } from "../filter";

const SideFilter = () => {
  return (
    <div className="w-[200px]">
      <div>
        <h1>Packs</h1>
      </div>
      <div>
        <h1>Rarity</h1>
        {/* diamond */}
        <FilterRarity src="/rarity/diamond.webp" num={1} />
        <FilterRarity src="/rarity/diamond.webp" num={2} />
        <FilterRarity src="/rarity/diamond.webp" num={3} />
        <FilterRarity src="/rarity/diamond.webp" num={4} />
        {/* stars */}
        <FilterRarity src="/rarity/star.webp" num={1} />
        <FilterRarity src="/rarity/star.webp" num={2} />
        <FilterRarity src="/rarity/star.webp" num={3} />
        {/* shining */}
        <FilterRarity src="/rarity/shiny.webp" num={1} />
        <FilterRarity src="/rarity/shiny.webp" num={2} />
        {/* crown */}
        <FilterRarity src="/rarity/crown.webp" num={1} />
      </div>
      <div>
        <h1>Energy type</h1>
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
