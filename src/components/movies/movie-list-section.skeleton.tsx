"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import Button from "../global/button";

const MovieListSectionSkeleton = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <div className="h-7 md:h-9 bg-muted rounded-md w-2/3" />
          <div className="h-4 bg-muted rounded-md w-1/2" />
          <div className="h-[4px] bg-gradient-to-r from-muted/80 to-muted/40 w-[70%] rounded-full"></div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            disabled
            className="z-30 size-10 rounded-full bg-muted text-muted-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            disabled
            className="z-30 size-10 rounded-full bg-muted text-muted-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-20 bg-gradient-to-l from-background to-transparent" />

      {/* Skeleton Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={"auto"}
        className="!mx-0"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 3, spaceBetween: 14 },
          768: { slidesPerView: 4, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 24 },
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SwiperSlide key={i} className="!w-[200px] sm:!w-[200px] md:!w-[240px]">
            <div className="h-80 w-full rounded-xl bg-muted"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MovieListSectionSkeleton;
