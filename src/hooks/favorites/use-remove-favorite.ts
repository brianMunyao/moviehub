"use client";

import { useState } from "react";

import { useFavoritesStore } from "@/store/use-favorites-store";
import { IResponse } from "@/types/IResponse";
import { fetcher } from "@/utils/global/fetcher";

export const useRemoveFavorite = () => {
  const { removeFavorite } = useFavoritesStore();
  const [isLoading, setIsLoading] = useState(false);

  const remove = async (tmdbId: number, mediaType: "movie" | "tv") => {
    setIsLoading(true);

    await fetcher<IResponse<object>>("/api/favorites", {
      method: "DELETE",
      data: { tmdbId, mediaType },
    });
    removeFavorite(tmdbId, mediaType);

    setIsLoading(false);
  };

  return { removeFavorite: remove, isLoading };
};
