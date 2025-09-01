"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LucideFilm, Loader2Icon, Video } from "lucide-react";
import gsap from "gsap";

import AppSelect from "@/components/global/app-select";
import AppInput from "@/components/global/app-input";
import MovieCard from "@/components/movies/movie-card";
import { useSearch } from "@/hooks/recommendations/use-search";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [genres, setGenres] = useState(searchParams.get("genres") || "");

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const debounceTimeout = useRef<NodeJS.Timeout>(null);

  const filmRef = useRef<SVGSVGElement | null>(null);
  const videoRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => setDebouncedQuery(query), 3000);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  const { results, page, total_pages, isLoading, mutate } = useSearch(debouncedQuery, {
    category,
    year,
    genres,
    page: 1,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("query", debouncedQuery);
    if (category !== "all") params.set("category", category);
    if (year) params.set("year", year);
    if (genres && genres !== "all") params.set("genres", genres);

    router.replace(`/search?${params.toString()}`);
  }, [debouncedQuery, category, year, genres, router]);

  useEffect(() => {
    if (filmRef.current && videoRef.current) {
      gsap.fromTo(
        filmRef.current,
        { y: -20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.75)" }
      );
      gsap.fromTo(
        videoRef.current,
        { y: 20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.75)", delay: 0.2 }
      );

      // Floating effect
      gsap.to(filmRef.current, {
        y: -5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2,
      });
      gsap.to(videoRef.current, {
        y: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2.5,
      });
    }
  }, []);

  // Hover scale interaction
  const handleHover = (ref: React.RefObject<SVGSVGElement | null>, isEnter: boolean) => {
    if (ref && ref?.current) {
      gsap.to(ref.current, {
        scale: isEnter ? 1.2 : 1,
        rotate: isEnter ? 10 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="mt-[100px] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="space-y-2 flex items-center flex-col py-10 md:py-16 gap-2">
          <div className="flex items-center gap-6">
            <LucideFilm
              ref={filmRef}
              size={48}
              onMouseEnter={() => handleHover(filmRef, true)}
              onMouseLeave={() => handleHover(filmRef, false)}
              className="cursor-pointer text-muted"
            />
            <h1 className="text-2xl md:text-4xl font-bold">Discover Your Next Favorite</h1>
            <Video
              ref={videoRef}
              size={48}
              onMouseEnter={() => handleHover(videoRef, true)}
              onMouseLeave={() => handleHover(videoRef, false)}
              className="cursor-pointer text-muted"
            />
          </div>
          <p className="text-gray-500">Search movies and TV shows by category, genre, or year.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <AppInput
            label="Search"
            placeholder="Search movies or TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <AppSelect
            label="Category"
            value={category}
            onChange={setCategory}
            placeholder="Category"
            options={[
              { label: "All", value: "all" },
              { label: "Movie", value: "movie" },
              { label: "TV Shows", value: "tv" },
            ]}
          />

          <AppInput
            label="Year"
            type="number"
            min={1900}
            max={new Date().getFullYear()}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
          />

          <AppSelect
            label="Genre"
            value={genres}
            onChange={setGenres}
            placeholder="Genre"
            options={[
              { label: "All", value: "all" },
              {
                label: "Movies",
                options: [
                  { label: "Action", value: "action" },
                  { label: "Drama", value: "drama" },
                ],
              },
              {
                label: "TV",
                options: [
                  { label: "Comedy", value: "comedy" },
                  { label: "Documentary", value: "doc" },
                ],
              },
            ]}
          />
        </div>

        <section className="space-y-4">
          {isLoading && (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-300 dark:bg-zinc-700 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          )}

          {!isLoading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-2">
              <LucideFilm size={48} />
              <p>No results found</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="w-fit flex flex-col gap-1 mb-5">
                <h3 className="text-xl md:text-2xl font-bold">
                  Search Results for &ldquo;{query}&rdquo;
                </h3>
                <div className="h-[10px] bg-primary w-[30%] rounded-full"></div>
              </div>

              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {results.map((item) => (
                  <div key={item.id} className="h-80">
                    <MovieCard item={item} flex />
                  </div>
                ))}
              </div>
            </div>
          )}

          {page < total_pages && results.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                // @ts-expect-error //TODO: handle this
                onClick={() => mutate({ page: page + 1 }, { revalidate: true })}
              >
                {isLoading ? <Loader2Icon className="animate-spin w-4 h-4 mr-2 inline" /> : null}
                Load More
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchPage;
