"use client";

import { IMediaItem } from "@/types/IMediaItem";
import React from "react";
import MovieCard from "./movie-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type Props = {
  title: string;
  movies: IMediaItem[];
};

const MovieListSection = ({ title, movies }: Props) => {
  return (
    <section className="space-y-4 max-w-6xl mx-auto py-5 md:py-10">
      <div className="w-fit flex flex-col gap-1 mb-5">
        <h3 className="text-xl md:text-3xl font-bold">{title}</h3>
        <div className="h-[10px] bg-primary w-[60%] rounded-full"></div>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={"auto"}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="!px-10"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="!w-auto">
              <MovieCard item={movie} />
            </SwiperSlide>
          ))}

          {/* Left Arrow */}
          <button className="swiper-button-prev !absolute !top-1/2 !left-0 z-10 !w-10 !h-10 rounded-full bg-black/50 text-white flex items-center justify-center">
            {/* ◀ */}
          </button>

          {/* Right Arrow */}
          <button className="swiper-button-next !absolute !top-1/2 !right-0 z-10 !w-10 !h-10 rounded-full bg-black/50 text-white flex items-center justify-center">
            {/* ▶ */}
          </button>
        </Swiper>
      </div>
    </section>
  );
};

export default MovieListSection;
