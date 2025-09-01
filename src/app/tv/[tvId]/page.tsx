"use client";

import React from "react";

import { tv_shows } from "@/constants/mock-data/tv-shows";
import TvDetail from "@/components/movies/tv-detail";
import MovieListGridSection from "@/components/movies/movie-list-grid-section";
import { normalizeTV } from "@/utils/tmdb/normalize-media-item";
import { useTVDetails } from "@/hooks/tv/use-tv-details";
import { TvDetailSkeleton } from "@/components/movies/tv-details.skeleton";
import NotFoundSection from "@/components/global/not-found-section";
import { Tv } from "lucide-react";

type Props = {
  params: Promise<{ tvId: string }>;
};

const TvPage = ({ params }: Props) => {
  const { tvId } = React.use(params);
  const { tv, isLoading } = useTVDetails(Number(tvId));

  if (isLoading) {
    return <TvDetailSkeleton />;
  }

  if (!tv) {
    return (
      <NotFoundSection
        Icon={Tv}
        title="TV Show Not Found"
        description="We couldn't find details for this TV show."
      />
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <TvDetail tv={tv} />

      <MovieListGridSection title="You might also like" movies={tv_shows.map(normalizeTV)} />
    </div>
  );
};

export default TvPage;
