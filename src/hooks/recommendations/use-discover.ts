"use client";

import useSWR from "swr";

import { IMediaItem } from "@/types/IMediaItem";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { fetcher } from "@/utils/global/fetcher";
import { toUrlSearchParams } from "@/utils/api/to-url-search-params";
import { IGETPaginatedResponse, IResponse } from "@/types/IResponse";

export const useDiscover = ({ page = 1 }: { page?: number }): IGETPaginatedResponse<IMediaItem> => {
  const searchParams = toUrlSearchParams({ page });

  const { data, error, isLoading } = useSWR<IResponse<IPaginatedResponse<IMediaItem>>, Error>(
    `api/recommendations/discover/${searchParams}`,
    (url: string, p: number) =>
      fetcher<IResponse<IPaginatedResponse<IMediaItem>>>(url, {
        method: "GET",
        params: { page: p },
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
