import React from "react";

import { movie_detail, movies } from "@/constants/mock-data/movies";
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
      <MovieDetail movie={movie} />

      <MovieListGridSection title="You might also like" movies={movies.map(normalizeMovie)} />
    </div>
  );
};

export default MoviePage;
