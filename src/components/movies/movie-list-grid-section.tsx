import React from "react";

import MovieCard from "./movie-card";
import { IMediaItem } from "@/types/IMediaItem";

type Props = {
  title?: string;
  movies: IMediaItem[];
};

const MovieListGridSection = ({ title, movies }: Props) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-10 max-w-6xl mx-auto">
      {title && (
        <div className="w-fit flex flex-col gap-1 mb-5">
          <h3 className="text-xl md:text-3xl font-bold">{title}</h3>
          <div className="h-[10px] bg-primary w-[30%] rounded-full"></div>
        </div>
      )}

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((item) => (
          <div key={item.id} className="h-80">
            <MovieCard item={item} flex />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListGridSection;
