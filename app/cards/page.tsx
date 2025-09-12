import React, { Suspense } from "react";
import CardsClient from "../components/CardsClient";
import SearchInputBox from "../components/SearchInputBox";

const FilteredCards = () => {
  return (
    <div className="flex flex-col py-8 px-6">
      {/* <div>
        <SideFilter />
        <MobileFilters />
      </div> */}
      <Suspense fallback={<div className="px-6 py-8">Loading…</div>}>
        <SearchInputBox />
        <CardsClient />
      </Suspense>
    </div>
  );
};

export default FilteredCards;
