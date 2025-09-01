"use client";

import useSWR from "swr";
import { IMediaItem } from "@/types/IMediaItem";
import { IResponse } from "@/types/IResponse";
import { fetcher } from "@/utils/global/fetcher";
import { useFavoritesStore } from "@/store/use-favorites-store";

export const useFavorites = () => {
  const { favorites, setFavorites } = useFavoritesStore();

  const { error, isLoading, mutate } = useSWR<IResponse<{ favorites: IMediaItem[] }>, Error>(
    "/api/favorites",
    (url: string) => fetcher<IResponse<{ favorites: IMediaItem[] }>>(url, { method: "GET" }),
    {
      onSuccess: (res) => {
        setFavorites(res.data?.favorites || []);
      },
    }
  );

  return {
    favorites,
    isLoading,
    error,
    mutate,
  };
};
