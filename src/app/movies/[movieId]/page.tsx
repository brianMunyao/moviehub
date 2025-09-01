"use client";

import React from "react";
import { Film } from "lucide-react";

import MovieListGridSection from "@/components/movies/movie-list-grid-section";
import { normalizeMovie } from "@/utils/tmdb/normalize-media-item";
import NotFoundSection from "@/components/global/not-found-section";
import { movies } from "@/constants/mock-data/movies";
import { useMovieDetails } from "@/hooks/movies/use-movie-details";
import { MovieDetailSkeleton } from "@/components/movies/movie-details.skeleton";
import { MovieDetail } from "@/components/movies/movie-detail";

type Props = {
  params: Promise<{ movieId: string }>;
};

const MoviePage = ({ params }: Props) => {
  const { movieId } = React.use(params);
  const { movie, isLoading } = useMovieDetails(Number(movieId));

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (!movie) {
    return (
      <NotFoundSection
        Icon={Film}
        title="Movie Not Found"
        description="We couldn't find details for this movie."
      />
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <MovieDetail movie={movie} />

      <MovieListGridSection title="You might also like" movies={movies.map(normalizeMovie)} />
    </div>
  );
};

export default MoviePage;
