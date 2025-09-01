"use client";

import HeroSection from "@/components/landing/hero-section";
import MovieListSection from "@/components/movies/movie-list-section";
import { movies } from "@/constants/mock-data/movies";
import { tv_shows } from "@/constants/mock-data/tv-shows";
import { useDiscover } from "@/hooks/recommendations/use-discover";
import { normalizeMovie, normalizeTV } from "@/utils/tmdb/normalize-media-item";
import React from "react";

const HomePage = () => {
  const { results } = useDiscover({ page: 1 });

  return (
    <main className="">
      <HeroSection movies={results} />

      <MovieListSection title="Movies" movies={movies.map(normalizeMovie)} />

      <MovieListSection title="TV" movies={tv_shows.map(normalizeTV)} />
    </main>
  );
};

export default HomePage;
