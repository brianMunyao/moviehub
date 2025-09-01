/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Image from "next/image";
import { buildImageUrl } from "@/utils/tmdb/build-image-url";
import { cn } from "@/lib/utils";
import Button from "../global/button";
import { Bookmark } from "lucide-react";
import { IMediaItem } from "@/types/IMediaItem";
import { toast } from "sonner";
import FavoriteButton from "../favorites/favorites-button";

type Props = {
  movies: IMediaItem[];
};

const AUTO_SCROLL_SPEED = 4000;

const HeroSection = ({ movies }: Props) => {
  const [posterError, setPosterError] = useState(false);
  return (
    <div className="relative w-full h-[95vh] max-h-[700px] bg-black overflow-hidden">
      <Swiper
        slidesPerView={1}
        centeredSlides
        loop
        autoplay={{ delay: AUTO_SCROLL_SPEED, disableOnInteraction: false }}
        modules={[Autoplay, Navigation]}
        className="size-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative size-full pb-[10px] md:pb-[30px]">
              <Image
                src={buildImageUrl(movie.backdrop_path) || ""}
                alt={movie.title}
                fill
                style={{ objectFit: "cover" }}
                className="brightness-75 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/60" />

              <div className="relative z-20 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-8 md:gap-12 h-full px-2 max-w-7xl mx-auto">
                <div
                  className={cn(
                    "relative w-[170px] h-[250px] rounded-xl overflow-hidden shadow-lg transition-transform duration-500"
                  )}
                >
                  <Image
                    src={
                      !posterError
                        ? buildImageUrl(movie.poster_path) || ""
                        : "https://placehold.co/300x400/EEE/aaaaaa?font=montserrat&text=Not+Found"
                    }
                    alt={movie.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500"
                    onError={() => setPosterError(true)}
                  />
                </div>

                <div className="w-full text-white max-w-xl">
                  <h1 className="text-center md:text-start text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg line-clamp-1 md:line-clamp-2 leading-16">
                    {movie.title}
                  </h1>
                  <p className="text-center md:text-start text-sm md:text-base mb-6 line-clamp-2 md:line-clamp-4 opacity-90">
                    {movie.overview}
                  </p>

                  <div className="flex gap-3 justify-center md:justify-start">
                    <FavoriteButton mediaItem={movie} />

                    <Button
                      variant="secondary"
                      IconStart={Bookmark}
                      onClick={() => toast.warning("Feature upcoming.")}
                    >
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
