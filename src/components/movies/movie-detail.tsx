import React from "react";
import Image from "next/image";
import { Star, Clock, Film } from "lucide-react";

import { buildImageUrl } from "@/utils/tmdb/build-image-url";
import { IMovieDetail } from "@/types/IMovie";

type Props = {
  movie: IMovieDetail;
};

export const MovieDetail = ({ movie }: Props) => {
  return (
    <div className="h-[90vh] w-full bg-black text-white">
      <div className="relative w-full h-[90vh]">
        <Image
          src={buildImageUrl(movie.backdrop_path, "original") || ""}
          alt={movie.title}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative px-4 flex flex-col md:flex-row gap-8 bottom-10 -translate-y-full">
        <div className="relative w-52 h-72 shrink-0">
          <Image
            src={buildImageUrl(movie.poster_path) || ""}
            alt={movie.title}
            fill
            className="rounded-xl object-cover shadow-lg"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
          <p className="text-lg italic text-gray-300">{movie.tagline}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()})
            </div>
            <span>{new Date(movie.release_date).getFullYear()}</span>

            {movie?.runtime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {movie.runtime} min
              </div>
            )}

            {movie?.genres && movie?.genres.length > 0 && (
              <div className="flex items-center gap-1">
                <Film className="w-4 h-4" />
                {movie?.genres.map((g) => g.name).join(", ")}
              </div>
            )}
          </div>

          <p className="text-gray-200 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};
