import React from "react";
import SideFilter from "../components/SideFilter";
import MobileFilters from "../components/MobileFilters";

const FilteredCards = () => {
  return (
    <div className="flex py-8 px-6">
      <div>
        <SideFilter />
        <MobileFilters />
      </div>
    </div>
  );
};

export default FilteredCards;
