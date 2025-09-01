import React from "react";

import { movie_detail, movies } from "@/constants/mock-data/movies";
import NavBar from "@/components/global/navbar";
import { MovieDetail } from "@/components/movies/movie-detail";
import { normalizeMovie } from "@/utils/tmdb/normalize-media-item";
import MovieListGridSection from "@/components/movies/movie-list-grid-section";

type Props = {
  params: Promise<{ movieId: string }>;
};

const MoviePage = ({ params }: Props) => {
  const movie = movie_detail;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="z-20 fixed top-0 left-0 w-full">
        <NavBar />
      </div>

      <MovieDetail movie={movie} />

      <MovieListGridSection title="You might also like" movies={movies.map(normalizeMovie)} />
    </div>
  );
};

export default MoviePage;
