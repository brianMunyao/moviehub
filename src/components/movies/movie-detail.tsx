import React from "react";
import Image from "next/image";
import { Star, Clock, Film, Bookmark } from "lucide-react";

import { buildImageUrl } from "@/utils/tmdb/build-image-url";
import { IMovieDetail } from "@/types/IMovie";
import FavoriteButton from "../favorites/favorites-button";
import Button from "../global/button";
import { toast } from "sonner";
import { normalizeMovie } from "@/utils/tmdb/normalize-media-item";

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

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="border flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-100">
              <Star className="w-4 h-4 text-yellow-400" />
              {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()})
            </div>

            <div className="border px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-100">
              {new Date(movie.release_date).getFullYear()}
            </div>

            {movie?.runtime && (
              <div className="border flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-100">
                <Clock className="w-4 h-4" /> {movie.runtime} min
              </div>
            )}

            {movie?.genres && movie?.genres.length > 0 && (
              <div className="border flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-100">
                <Film className="w-4 h-4" />
                {movie.genres.map((g) => g.name).join(", ")}
              </div>
            )}
          </div>

          <p className="text-gray-200 leading-relaxed max-w-[80%]">{movie.overview}</p>

          <div className="flex gap-3 justify-center md:justify-start">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <FavoriteButton mediaItem={normalizeMovie(movie as any)} />

            <Button
              variant="secondary"
              IconStart={Bookmark}
              onClick={() => toast.warning("Feature upcoming.")}
            >
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
