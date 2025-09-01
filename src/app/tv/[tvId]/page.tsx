import React from "react";

import { tv_detail, tv_shows } from "@/constants/mock-data/tv-shows";
import NavBar from "@/components/global/navbar";
import TvDetail from "@/components/movies/tv-detail";
import MovieListGridSection from "@/components/movies/movie-list-grid-section";
import { normalizeTV } from "@/utils/tmdb/normalize-media-item";

const TvPage = ({ params }: { params: { tvId: string } }) => {
  const tv = tv_detail;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="z-20 fixed top-0 left-0 w-full">
        <NavBar />
      </div>

      <TvDetail tv={tv} />

      <MovieListGridSection title="You might also like" movies={tv_shows.map(normalizeTV)} />
    </div>
  );
};

export default TvPage;
