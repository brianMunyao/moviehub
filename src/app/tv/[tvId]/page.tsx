"use client";

import React from "react";

import TvDetail from "@/components/movies/tv-detail";
import MovieListGridSection from "@/components/movies/movie-list-grid-section";
import { useTVDetails } from "@/hooks/tv/use-tv-details";
import { TvDetailSkeleton } from "@/components/movies/tv-details.skeleton";
import NotFoundSection from "@/components/global/not-found-section";
import { Tv } from "lucide-react";
import { useSimilarTVShows } from "@/hooks/tv/use-similar-tv-shows";

type Props = {
  params: Promise<{ tvId: string }>;
};

const TvPage = ({ params }: Props) => {
  const { tvId } = React.use(params);

  const { tv, isLoading } = useTVDetails(Number(tvId));

  const { results: similarTV, isLoading: isSimilarTvLoading } = useSimilarTVShows(Number(tvId));

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

      <MovieListGridSection
        title="You might also like"
        movies={similarTV}
        isLoading={isSimilarTvLoading}
      />
    </div>
  );
};

export default TvPage;
