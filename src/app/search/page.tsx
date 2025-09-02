"use client";

import { Suspense } from "react";
import SearchPage from "@/components/search/search-page";

const SearchPageWrapper = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading search...</div>}>
      <SearchPage />
    </Suspense>
  );
};

export default SearchPageWrapper;
