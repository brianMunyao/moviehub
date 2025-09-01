"use client";

import useSWR from "swr";

import { IMediaType } from "@/types/IMediaItem";
import { fetcher } from "@/utils/global/fetcher";
import { IResponse } from "@/types/IResponse";
import { IGenre } from "@/types/IGenre";

export const useGenres = (
  mediaType: IMediaType | "all"
): { genres: IGenre[]; cached: boolean; isLoading: boolean; error: unknown } => {
  const { data, error, isLoading } = useSWR<
    IResponse<{ genres: IGenre[]; cached: boolean }>,
    Error
  >(`api/genres/${mediaType}`, (url: string) =>
    fetcher<IResponse<{ genres: IGenre[]; cached: boolean }>>(url, {
      method: "GET",
    })
  );

  return {
    genres: data?.data?.genres || [],
    cached: data?.data?.cached || false,
    isLoading,
    error,
  };
};
