import React from "react";

import { tv_detail, tv_shows } from "@/constants/mock-data/tv-shows";
import TvDetail from "@/components/movies/tv-detail";
import MovieListGridSection from "@/components/movies/movie-list-grid-section";
import { normalizeTV } from "@/utils/tmdb/normalize-media-item";

type Props = {
  params: Promise<{ tvId: string }>;
};

const TvPage = ({ params }: Props) => {
  const tv = tv_detail;

  return (
    <div className="relative w-full overflow-hidden">
      <TvDetail tv={tv} />

      <MovieListGridSection title="You might also like" movies={tv_shows.map(normalizeTV)} />
    </div>
  );
};

export default TvPage;
