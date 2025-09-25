import React, { Suspense } from "react";
import CardsClient from "../components/CardsClient";
import SearchInputBox from "../components/SearchInputBox";
import ChatWithMeIcon from "../components/ChatWithMeIcon";
import BackButton from "../components/BackButton";

const FilteredCards = () => {
  return (
    <div className="flex flex-col py-8 px-6">
      {/* <div>
        <SideFilter />
        <MobileFilters />
      </div> */}
      <Suspense fallback={<div className="px-6 py-8">Loading…</div>}>
        <BackButton />
        <div className="flex justify-between">
          <SearchInputBox />
          <ChatWithMeIcon />
        </div>
        <CardsClient />
      </Suspense>
    </div>
  );
};

export default FilteredCards;
