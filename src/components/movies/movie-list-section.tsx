"use client";

import { IMediaItem } from "@/types/IMediaItem";
import React, { useRef } from "react";
import MovieCard from "./movie-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import Button from "../global/button";
import MovieListSectionSkeleton from "./movie-list-section.skeleton";

type Props = {
  title: string;
  tagline?: string;
  movies: IMediaItem[];
  isLoading?: boolean;
};

const MovieListSection = ({ title, tagline, movies, isLoading }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  if (isLoading) {
    return <MovieListSectionSkeleton />;
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-6">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="z-30 text-2xl md:text-4xl font-extrabold tracking-tight">{title}</h3>
          {tagline && <p className="z-30 text-muted-foreground text-sm md:text-base">{tagline}</p>}
          <div className="z-30 h-[4px] bg-gradient-to-r from-primary/80 to-primary/40 w-[70%] rounded-full"></div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            className="z-30 size-10 rounded-full bg-background text-foreground hover:bg-foreground hover:text-background"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            className="z-30 size-10 rounded-full bg-background text-foreground hover:bg-foreground hover:text-background"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-20 bg-gradient-to-l from-background to-transparent" />

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="!mx-0"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 3, spaceBetween: 14 },
          768: { slidesPerView: 4, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 24 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="!w-[200px] sm:!w-[200px] md:!w-[240px]">
            <div className="h-80">
              <MovieCard item={movie} flex />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MovieListSection;
