"use client";

import useSWR from "swr";

import { fetcher } from "@/utils/global/fetcher";
import { IGETPaginatedResponse, IResponse } from "@/types/IResponse";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { IMediaItem } from "@/types/IMediaItem";

export const useSimilarTVShows = (id: number): IGETPaginatedResponse<IMediaItem> => {
  const { data, error, isLoading } = useSWR<IResponse<IPaginatedResponse<IMediaItem>>, Error>(
    `/api/tv/${id}/similar/`,
    (url: string) =>
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
  };
};
