"use client";

import HeroSection from "@/components/landing/hero-section";
import MovieListSection from "@/components/movies/movie-list-section";
import { movies } from "@/constants/mock-data/movies";
import { tv_shows } from "@/constants/mock-data/tv-shows";
import { useTopRatedMovies } from "@/hooks/movies/use-top-rated-movies";
import { useDiscover } from "@/hooks/recommendations/use-discover";
import { useTrending } from "@/hooks/recommendations/use-trending";
import { shuffleArray } from "@/utils/global/shuffle-array";
import { normalizeMovie, normalizeTV } from "@/utils/tmdb/normalize-media-item";
import React from "react";

const HomePage = () => {
  const { results } = useDiscover({ page: 1 });

  const { results: trendingNow, isLoading: isTrendingNowLoading } = useTrending({
    timeWindow: "day",
  });

  const { results: topRatedMovies, isLoading: isTopRatedMoviesLoading } = useTopRatedMovies({});

  return (
    <main className="">
      <HeroSection movies={results} />

      <MovieListSection
        title="Trending Today"
        movies={trendingNow}
        isLoading={isTrendingNowLoading}
      />

      <MovieListSection title="TV" movies={shuffleArray(tv_shows).map(normalizeTV)} />

      <MovieListSection
        title="Top Rated Movies"
        movies={topRatedMovies}
        isLoading={isTopRatedMoviesLoading}
      />

      <MovieListSection title="Movies" movies={shuffleArray(movies).map(normalizeMovie)} />
    </main>
  );
};

export default HomePage;
