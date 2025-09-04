import React, { useContext } from "react";
import SideFilter from "../components/SideFilter";
import MobileFilters from "../components/MobileFilters";
import { SearchContext, useSearch } from "../context/SearchContext";
import Link from "next/link";
import Image from "next/image";
import CardsClient from "../components/CardsClient";

const FilteredCards = () => {
  return (
    <div className="flex py-8 px-6">
      <div>
        <SideFilter />
        <MobileFilters />
      </div>

      <CardsClient />
    </div>
  );
};

export default FilteredCards;
