import React from "react";
import SideFilter from "../components/SideFilter";
import MobileFilters from "../components/MobileFilters";
import CardsClient from "../components/CardsClient";

const FilteredCards = () => {
  return (
    <div className="flex py-8 px-6">
      {/* <div>
        <SideFilter />
        <MobileFilters />
      </div> */}

      <CardsClient />
    </div>
  );
};

export default FilteredCards;
