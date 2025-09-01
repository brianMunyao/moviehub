import moviesService from "./movies.service";
import tvService from "./tv.service";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { IMediaItem } from "@/types/IMediaItem";
import { normalizeMovie, normalizeTV } from "@/utils/tmdb/normalize-media-item";
import { IMultiQueryOptions } from "@/types/IMulti";
import tmdbAxiosApiClient from "@/configs/tmdb/axios-client";

const recommendationService = {
  // --- Recommendations ---
  async getRecommendations(type: "movie" | "tv", id: number, page = 1) {
    return type === "movie"
      ? moviesService.getRecommendations(id, page)
      : tvService.getRecommendations(id, page);
  },

  // --- Similar ---
  async getSimilar(type: "movie" | "tv", id: number, page = 1) {
    return type === "movie" ? moviesService.getSimilar(id, page) : tvService.getSimilar(id, page);
  },

  // --- Discover ---
  async discover(type: "movie" | "tv", filters: Record<string, unknown> = {}, page = 1) {
    return type === "movie"
      ? moviesService.discover(filters, page)
      : tvService.discover(filters, page);
  },

  // --- Search ---
  async searchAll(
    query: string,
    params: IMultiQueryOptions = {}
  ): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await tmdbAxiosApiClient.get(`/search/multi`, {
      params: { query, ...params },
    });
    return {
      ...data,
      results: data.results
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => {
          if (item.media_type === "movie") return normalizeMovie(item);
          if (item.media_type === "tv") return normalizeTV(item);
          return null;
        })
        .filter(Boolean),
    };
  },

  // --- Trending ---
  async trending(
    mediaType: "all" | "movie" | "tv" | "person" = "all",
    timeWindow: "day" | "week" = "day",
    page = 1
  ): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await tmdbAxiosApiClient.get(`/trending/${mediaType}/${timeWindow}`, {
      params: { page },
    });
    return {
      ...data,
      results: data.results
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => {
          if (item.media_type === "movie" || mediaType === "movie") return normalizeMovie(item);
          if (item.media_type === "tv" || mediaType === "tv") return normalizeTV(item);
          return null;
        })
        .filter(Boolean),
    };
  },
};

export default recommendationService;
