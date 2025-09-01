import HeroSection from "@/components/landing/hero-section";
import MovieListSection from "@/components/movies/movie-list-section";
import { movies } from "@/constants/mock-data/movies";
import { tv_shows } from "@/constants/mock-data/tv-shows";
import { normalizeMovie, normalizeTV } from "@/utils/tmdb/normalize-media-item";
import React from "react";

const HomePage = () => {
  return (
    <main className="">
      <HeroSection movies={movies.map(normalizeMovie)} />

      <MovieListSection title="Movies" movies={movies.map(normalizeMovie)} />

      <MovieListSection title="TV" movies={tv_shows.map(normalizeTV)} />
    </main>
  );
};

export default HomePage;
