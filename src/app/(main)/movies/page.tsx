"use client";

import React from "react";

import MovieListGridSection from "@/components/movies/movie-list-grid-section";
import { useDiscoverInfinite } from "@/hooks/recommendations/use-discover-infinite";
import Button from "@/components/global/button";

const DiscoverPage = () => {
  const { results, isLoading, isReachingEnd, size, setSize, error } = useDiscoverInfinite({
    pageSize: 20,
  });

  const isInitialLoading = isLoading && size === 1;
  const isLoadingMore = isLoading && size > 1;

  const loadMore = () => {
    if (!isReachingEnd) setSize(size + 1);
  };

  return (
    <section>
      <div className="flex flex-col gap-8 pt-16 pb-6">
        <MovieListGridSection
          title="Discover Movies & TV Shows"
          description="Explore trending and popular content"
          movies={results}
          isLoading={isInitialLoading}
        />

        {!isReachingEnd && results.length > 0 && (
          <div className="flex justify-center">
            <Button onClick={loadMore} loading={isLoadingMore}>
              {isLoadingMore ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 mt-4">Failed to load content. Please try again.</p>
        )}
      </div>
    </section>
  );
};

export default DiscoverPage;
