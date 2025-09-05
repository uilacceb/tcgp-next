import React, { Suspense } from "react";
import CardsClient from "../components/CardsClient";

const FilteredCards = () => {
  return (
    <div className="flex py-8 px-6">
      {/* <div>
        <SideFilter />
        <MobileFilters />
      </div> */}
      <Suspense fallback={<div className="px-6 py-8">Loading…</div>}>
        <CardsClient />
      </Suspense>
    </div>
  );
};

export default FilteredCards;
