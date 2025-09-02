"use client";

import useSWR from "swr";

import { fetcher } from "@/utils/global/fetcher";
import { IResponse } from "@/types/IResponse";
import { IMovieDetail } from "@/types/IMovie";

export const useMovieDetails = (
  id: number
): { movie: IMovieDetail | undefined; cached: boolean; isLoading: boolean; error: unknown } => {
  const { data, error, isLoading } = useSWR<
    IResponse<{ movie: IMovieDetail; cached: boolean }>,
    Error
  >(`/api/movies/${id}`, (url: string) =>
    fetcher<IResponse<{ movie: IMovieDetail; cached: boolean }>>(url, {
      method: "GET",
    })
  );

  console.log({ movie: data?.data?.movie, cached: data?.data?.cached || false, isLoading, error });

  return {
    movie: data?.data?.movie,
    cached: data?.data?.cached || false,
    isLoading,
    error,
  };
};
