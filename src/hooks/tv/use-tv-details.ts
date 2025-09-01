"use client";

import useSWR from "swr";

import { fetcher } from "@/utils/global/fetcher";
import { IResponse } from "@/types/IResponse";
import { ITVDetail } from "@/types/ITVShow";

export const useTVDetails = (
  id: number
): { tv: ITVDetail | undefined; cached: boolean; isLoading: boolean; error: unknown } => {
  const { data, error, isLoading } = useSWR<IResponse<{ tv: ITVDetail; cached: boolean }>, Error>(
    `/api/tv/${id}`,
    (url: string) =>
      fetcher<IResponse<{ tv: ITVDetail; cached: boolean }>>(url, {
        method: "GET",
      })
  );

  return {
    tv: data?.data?.tv,
    cached: data?.data?.cached || false,
    isLoading,
    error,
  };
};
