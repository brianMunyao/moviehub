"use client";

import React from "react";

import MovieCard from "./movie-card";
import { IMediaItem } from "@/types/IMediaItem";
import MovieListGridSectionSkeleton from "./movie-list-grid-section.skeleton";

type Props = {
  title?: string;
  description?: string;
  movies: IMediaItem[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
};

const MovieListGridSection: React.FC<Props> = ({
  title,
  description,
  movies,
  isLoading,
  onLoadMore,
  hasMore = false,
}) => {
  if (isLoading) {
    return <MovieListGridSectionSkeleton title={title} />;
  }

  return (
    <section className="flex flex-col gap-6 px-4 py-10 max-w-7xl w-full mx-auto">
      {title && (
        <header className="mb-6">
          <h3 className="text-xl md:text-3xl font-bold">{title}</h3>
          {description && <p className="text-sm md:text-base text-gray-500">{description}</p>}
          <div className="mt-1 h-[4px] md:h-[6px] bg-primary w-[20%] rounded-full"></div>
        </header>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((item) => (
          <div key={item.id} className="h-80">
            <MovieCard item={item} flex />
          </div>
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default MovieListGridSection;
