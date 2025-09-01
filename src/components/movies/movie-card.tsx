"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Bookmark, Info, Star, X } from "lucide-react";
import { IMediaItem } from "@/types/IMediaItem";
import { buildImageUrl } from "@/utils/tmdb/build-image-url";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { createPortal } from "react-dom";
import Button from "../global/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

gsap.registerPlugin(Flip);

type Props = { item: IMediaItem; flex?: boolean };

const MovieCard = ({ item, flex }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    const state = Flip.getState(cardRef.current!); // capture card state
    setIsOpen(true);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        absolute: true,
        onEnter: (elements) => gsap.fromTo(elements, { opacity: 0 }, { opacity: 1 }),
      });
    });
  };

  const closeModal = () => {
    const state = Flip.getState(modalRef.current!); // capture modal state
    setIsOpen(false);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        absolute: true,
        onLeave: (elements) => gsap.to(elements, { opacity: 0 }),
      });
    });
  };

  return (
    <>
      {/* Card inside Swiper */}
      <div
        ref={cardRef}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-2xl shadow-md",
          flex ? "size-full" : "w-48 h-72"
        )}
        onClick={openModal}
      >
        <Image
          src={buildImageUrl(item.poster_path) || ""}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <h3 className="text-white font-semibold text-sm line-clamp-2">{item.title}</h3>
          <div className="flex items-center justify-between text-xs text-gray-300 mt-1">
            <span className="uppercase">{item.media_type}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>{item.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal via portal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div
              ref={modalRef}
              className="relative w-[90vw] max-w-4xl h-[80vh] rounded-2xl overflow-hidden bg-black shadow-lg"
            >
              <button
                onClick={closeModal}
                className="cursor-pointer absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <Image
                src={buildImageUrl(item.backdrop_path || item.poster_path) || ""}
                alt={item.title}
                fill
                className="object-cover opacity-60"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black /70 via-black/10 to-transparent gap-2">
                <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                <p className="text-gray-300 text-sm line-clamp-4 max-w-2xl">{item.overview}</p>

                <div className="flex items-center gap-3 mt-1 text-gray-300 text-sm">
                  <span className="uppercase">{item.media_type}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{item.vote_average.toFixed(1)}</span>
                  </div>
                </div>

                <div className="mt-2 flex gap-3 justify-center md:justify-start">
                  <Button size="icon" variant="default" tooltip="Add to Watchlist">
                    <Bookmark className="size-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    className="text-white"
                    tooltip="Add to Favorites"
                  >
                    <Star className="size-4" />
                  </Button>

                  <Link
                    href={item.media_type === "movie" ? `/movies/${item.id}` : `/tv/${item.id}`}
                  >
                    <Button variant="outline" IconStart={Info} className="text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default MovieCard;
