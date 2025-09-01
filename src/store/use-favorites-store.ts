"use client";

import { create } from "zustand";
import { IMediaItem, IMediaType } from "@/types/IMediaItem";

type FavoritesState = {
  favorites: IMediaItem[];
  setFavorites: (favorites: IMediaItem[]) => void;
  addFavorite: (media: IMediaItem) => void;
  removeFavorite: (id: number, mediaType: IMediaType) => void;
  isFavorite: (id: number, mediaType: IMediaType) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  setFavorites: (favorites) => set({ favorites }),

  addFavorite: (media) =>
    set((state) => {
      if (state.favorites.find((f) => f.id === media.id && f.media_type === media.media_type)) {
        return state;
      }
      return { favorites: [...state.favorites, media] };
    }),

  removeFavorite: (tmdbId, mediaType) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => !(f.id === tmdbId && f.media_type === mediaType)),
    })),

  isFavorite: (tmdbId, mediaType) =>
    !!get().favorites.find((f) => f.id === tmdbId && f.media_type === mediaType),
}));
