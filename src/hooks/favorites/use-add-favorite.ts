"use client";

import { useState } from "react";

import { useFavoritesStore } from "@/store/use-favorites-store";
import { IMediaItem } from "@/types/IMediaItem";
import { IResponse } from "@/types/IResponse";
import { fetcher } from "@/utils/global/fetcher";

export const useAddFavorite = () => {
  const { addFavorite } = useFavoritesStore();
  const [isLoading, setIsLoading] = useState(false);

  const add = async (media: IMediaItem) => {
    setIsLoading(true);
    await fetcher<IResponse<object>>("/api/favorites", {
      method: "POST",
      data: { media },
    });

    addFavorite(media);

    setIsLoading(false);
  };

  return { addFavorite: add, isLoading };
};
