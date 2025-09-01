"use client";

import useSWR from "swr";

import { IMediaItem, IMediaType } from "@/types/IMediaItem";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { fetcher } from "@/utils/global/fetcher";
import { toUrlSearchParams } from "@/utils/api/to-url-search-params";
import { IGETPaginatedResponse, IResponse } from "@/types/IResponse";

export const useForYouRecommendations = ({
  page = 1,
  mediaType,
}: {
  page?: number;
  mediaType: IMediaType;
}): IGETPaginatedResponse<IMediaItem> => {
  const searchParams = toUrlSearchParams({ page });

  const { data, error, isLoading } = useSWR<IResponse<IPaginatedResponse<IMediaItem>>, Error>(
    `/api/recommendations/for-you/${mediaType}/${searchParams}`,
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
