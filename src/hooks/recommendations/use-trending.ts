"use client";

import useSWR, { KeyedMutator } from "swr";

import { IMediaItem } from "@/types/IMediaItem";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { fetcher } from "@/utils/global/fetcher";
import { toUrlSearchParams } from "@/utils/api/to-url-search-params";
import { IGETPaginatedResponse, IResponse } from "@/types/IResponse";

export const useTrending = (
  params?: Record<string, string | number | boolean>
): IGETPaginatedResponse<IMediaItem> & {
  mutate: KeyedMutator<IResponse<IPaginatedResponse<IMediaItem>>>;
} => {
  const searchParams = toUrlSearchParams({ ...(params || {}) });

  const { data, error, isLoading, mutate } = useSWR<
    IResponse<IPaginatedResponse<IMediaItem>>,
    Error
  >(`/api/recommendations/trending/${searchParams}`, (url: string) =>
    fetcher<IResponse<IPaginatedResponse<IMediaItem>>>(url, {
      method: "GET",
    })
  );

  return {
    results: data?.data?.results || [],
    total_pages: data?.data?.total_pages || 0,
    total_results: data?.data?.total_results || 0,
    page: data?.data?.page || 1,

    isLoading,
    error,
    mutate,
  };
};
