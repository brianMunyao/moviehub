import React from "react";
import Image from "next/image";
import { Star, Film, Tv } from "lucide-react";

import { buildImageUrl } from "@/utils/tmdb/build-image-url";
import { ITVDetail } from "@/types/ITVShow";

type Props = {
  tv: ITVDetail;
};

const TvDetail = ({ tv }: Props) => {
  return (
    <div className="h-[90vh] w-full bg-black text-white">
      <div className="relative w-full h-[90vh]">
        <Image
          src={buildImageUrl(tv.backdrop_path, "original") || ""}
          alt={tv.name}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative px-4 flex flex-col md:flex-row gap-8 bottom-10 -translate-y-full">
        <div className="relative w-52 h-72 shrink-0">
          <Image
            src={buildImageUrl(tv.poster_path) || ""}
            alt={tv.name}
            fill
            className="rounded-xl object-cover shadow-lg"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold">{tv.name}</h1>
          <p className="text-lg italic text-gray-300">{tv.tagline}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              {tv.vote_average.toFixed(1)} ({tv.vote_count.toLocaleString()})
            </div>
            <span>Seasons: {tv.number_of_seasons}</span>
            <span>Episodes: {tv.number_of_episodes}</span>
            <div className="flex items-center gap-1">
              <Film className="w-4 h-4" />
              {tv.genres.map((g) => g.name).join(", ")}
            </div>
            <div className="flex items-center gap-1">
              <Tv className="w-4 h-4" />
              {tv.status}
            </div>
          </div>

          <p className="text-gray-200 leading-relaxed">{tv.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default TvDetail;
