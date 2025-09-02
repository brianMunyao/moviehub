"use client";

import useSWRInfinite from "swr/infinite";
import { IMediaItem } from "@/types/IMediaItem";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { fetcher } from "@/utils/global/fetcher";
import { toUrlSearchParams } from "@/utils/api/to-url-search-params";

interface UseDiscoverInfiniteOptions {
  filters?: Record<string, unknown>;
  pageSize?: number;
}

export const useDiscoverInfinite = ({
  filters = {},
  pageSize = 20,
}: UseDiscoverInfiniteOptions = {}) => {
  const getKey = (pageIndex: number, previousPageData: IPaginatedResponse<IMediaItem> | null) => {
    if (previousPageData && previousPageData.results.length === 0) return null;

    const params = toUrlSearchParams({ page: pageIndex + 1, ...filters });
    return `/api/recommendations/discover/${params}`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite<IPaginatedResponse<IMediaItem>>(
    getKey,
    (url: string) => fetcher<{ data: IPaginatedResponse<IMediaItem> }>(url).then((res) => res.data)
  );

  const results = data ? data.flatMap((page) => page.results) : [];
  const total_pages = data?.[0]?.total_pages || 0;
  const total_results = data?.[0]?.total_results || 0;
  const page = data?.length || 1;
  const isReachingEnd = data && data[data.length - 1]?.results.length < pageSize;

  return {
    results,
    total_pages,
    total_results,
    page,
    isLoading,
    isReachingEnd,
    error,
    size,
    setSize,
  };
};
