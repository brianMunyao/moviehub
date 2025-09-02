"use client";

import Footer from "@/components/global/footer";
import NavBar from "@/components/global/navbar";
import HeroSection from "@/components/landing/hero-section";
import MovieListSection from "@/components/movies/movie-list-section";
import { tv_shows } from "@/constants/mock-data/tv-shows";
import { useTopRatedMovies } from "@/hooks/movies/use-top-rated-movies";
import { useDiscover } from "@/hooks/recommendations/use-discover";
import { useForYouRecommendations } from "@/hooks/recommendations/use-for-you-recommendations";
import { useTrending } from "@/hooks/recommendations/use-trending";
import { shuffleArray } from "@/utils/global/shuffle-array";
import { normalizeTV } from "@/utils/tmdb/normalize-media-item";
import { useAuth } from "@clerk/nextjs";
import React from "react";

const HomePage = () => {
  const { isSignedIn } = useAuth();
  const { results } = useDiscover({ page: 1 });

  const { results: trendingNow, isLoading: isTrendingNowLoading } = useTrending({
    timeWindow: "day",
  });

  const { results: topRatedMovies, isLoading: isTopRatedMoviesLoading } = useTopRatedMovies({});

  const { results: forYouRecommendations, isLoading: isForYouRecommendationsLoading } =
    useForYouRecommendations({ mediaType: "movie" });

  const { results: tvForYouRecommendations, isLoading: isTvForYouRecommendationsLoading } =
    useForYouRecommendations({ mediaType: "tv" });

  return (
    <main className="dark">
      <div className="z-[99] fixed top-0 left-0 w-full">
        <NavBar />
      </div>

      <HeroSection movies={results} />

      <MovieListSection
        title="Trending Today"
        movies={trendingNow}
        isLoading={isTrendingNowLoading}
      />

      {isSignedIn && (
        <MovieListSection
          title="For You"
          movies={forYouRecommendations}
          isLoading={isForYouRecommendationsLoading}
        />
      )}

      <MovieListSection title="TV" movies={shuffleArray(tv_shows).map(normalizeTV)} />

      <MovieListSection
        title="Top Rated Movies"
        movies={topRatedMovies}
        isLoading={isTopRatedMoviesLoading}
      />

      {isSignedIn && (
        <MovieListSection
          title="TV Shows For You"
          movies={tvForYouRecommendations}
          isLoading={isTvForYouRecommendationsLoading}
        />
      )}

      <Footer />
    </main>
  );
};

export default HomePage;
