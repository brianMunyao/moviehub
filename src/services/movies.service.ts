import tmdbAxiosApiClient from "@/configs/tmdb/axios-client";
import { IMediaItem } from "@/types/IMediaItem";
import { IMovieQueryOptions } from "@/types/IMovie";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { normalizeMovie } from "@/utils/tmdb/normalize-media-item";

let genreCache: { id: number; name: string }[] | null = null;
const getGenresCached = async () => {
  try {
    if (genreCache) return genreCache;
    const { data } = await tmdbAxiosApiClient.get("/genre/movie/list");
    genreCache = data.genres;
    return genreCache || [];
  } catch (err) {
    console.error("Error fetching genres:", err);
    return [];
  }
};

const moviesService = {
  async getPopular(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    try {
      const { data } = await tmdbAxiosApiClient.get(`/movie/popular`, { params: { page } });
      return { ...data, results: data.results.map(normalizeMovie) };
    } catch (err) {
      console.error("Error fetching popular movies:", err);
      return { results: [], page, total_pages: 0, total_results: 0 };
    }
  },

  async getTopRated(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    try {
      const { data } = await tmdbAxiosApiClient.get(`/movie/top_rated`, { params: { page } });
      return { ...data, results: data.results.map(normalizeMovie) };
    } catch (err) {
      console.error("Error fetching top-rated movies:", err);
      return { results: [], page, total_pages: 0, total_results: 0 };
    }
  },

  async getNowPlaying(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    try {
      const { data } = await tmdbAxiosApiClient.get(`/movie/now_playing`, { params: { page } });
      return { ...data, results: data.results.map(normalizeMovie) };
    } catch (err) {
      console.error("Error fetching now playing movies:", err);
      return { results: [], page, total_pages: 0, total_results: 0 };
    }
  },

  async getUpcoming(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    try {
      const { data } = await tmdbAxiosApiClient.get(`/movie/upcoming`, { params: { page } });
      return { ...data, results: data.results.map(normalizeMovie) };
    } catch (err) {
      console.error("Error fetching upcoming movies:", err);
      return { results: [], page, total_pages: 0, total_results: 0 };
    }
  },

  async getRecommendations(movieId: number, page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    try {
      const { data } = await tmdbAxiosApiClient.get(`/movie/${movieId}/recommendations`, {
        params: { page },
      });
      return { ...data, results: data.results.map(normalizeMovie) };
    } catch (err) {
      console.error(`Error fetching recommendations for movie ${movieId}:`, err);
      return { results: [], page, total_pages: 0, total_results: 0 };
    }
  },

  async getSimilar(movieId: number, page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    try {
      const { data } = await tmdbAxiosApiClient.get(`/movie/${movieId}/similar`, {
        params: { page },
      });
      return { ...data, results: data.results.map(normalizeMovie) };
    } catch (err) {
      console.error(`Error fetching similar movies for movie ${movieId}:`, err);
      return { results: [], page, total_pages: 0, total_results: 0 };
    }
  },

  async discover(
    params: IMovieQueryOptions = {},
    page = 1
  ): Promise<IPaginatedResponse<IMediaItem>> {
    try {
      const { data } = await tmdbAxiosApiClient.get(`/discover/movie`, {
        params: { page, ...params },
      });
      return { ...data, results: data.results.map(normalizeMovie) };
    } catch (err) {
      console.error("Error discovering movies:", err);
      return { results: [], page, total_pages: 0, total_results: 0 };
    }
  },

  async search(
    query: string,
    options?: Partial<IMovieQueryOptions>
  ): Promise<IPaginatedResponse<IMediaItem>> {
    try {
      const { data } = await tmdbAxiosApiClient.get("/search/movie", {
        params: { query, ...options },
      });

      return {
        results: data.results.map(normalizeMovie),
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
      };
    } catch (err) {
      console.error(`Error searching movies with query "${query}":`, err);
      return { results: [], page: 1, total_pages: 0, total_results: 0 };
    }
  },

  async details(id: number): Promise<IMediaItem | null> {
    try {
      const { data } = await tmdbAxiosApiClient.get(`/movie/${id}`);
      if (!data) return null;
      return normalizeMovie(data);
    } catch (err) {
      console.error(`Error fetching details for movie ${id}:`, err);
      return null;
    }
  },

  async genres(): Promise<{ id: number; name: string }[]> {
    return await getGenresCached();
  },
};

export default moviesService;
