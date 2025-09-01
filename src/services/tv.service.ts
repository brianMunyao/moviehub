import { paginated_tv_shows } from "@/constants/mock-data/tv-shows";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { ITVDetail, ITVQueryOptions } from "@/types/ITVShow";
import { IMediaItem } from "@/types/IMediaItem";
import { normalizeTV } from "@/utils/tmdb/normalize-media-item";
import tmdbAxiosApiClient from "@/configs/tmdb/axios-client";

let tvGenreCache: { id: number; name: string }[] | null = null;
async function getTVGenresCached() {
  if (tvGenreCache) return tvGenreCache;
  const { data } = await tmdbAxiosApiClient.get("/genre/tv/list");
  tvGenreCache = data.genres;
  return tvGenreCache || [];
}

export const tvService = {
  async getPopular(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await tmdbAxiosApiClient.get(`/tv/popular`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getTopRated(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await tmdbAxiosApiClient.get(`/tv/top_rated`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getOnTheAir(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await tmdbAxiosApiClient.get(`/tv/on_the_air`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getAiringToday(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await tmdbAxiosApiClient.get(`/tv/airing_today`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getRecommendations(tvId: number, page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await tmdbAxiosApiClient.get(`/tv/${tvId}/recommendations`, {
      params: { page },
    });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getSimilar(tvId: number, page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await tmdbAxiosApiClient.get(`/tv/${tvId}/similar`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async discover(params: ITVQueryOptions = {}, page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await tmdbAxiosApiClient.get(`/discover/tv`, { params: { page, ...params } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async search(
    query: string,
    options?: Partial<ITVQueryOptions>
  ): Promise<IPaginatedResponse<IMediaItem>> {
    // const { data } = await tmdbAxiosApiClient.get("/search/tv", {
    //   params: { query, ...options },
    // });
    const data = paginated_tv_shows;

    return {
      results: data.results.map(normalizeTV),
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
    };
  },

  async details(id: number): Promise<ITVDetail | null> {
    const { data } = await tmdbAxiosApiClient.get(`/tv/${id}`);
    if (!data) return null;
    return data;
  },

  async genres(): Promise<{ id: number; name: string }[]> {
    return await getTVGenresCached();
  },
};

export default tvService;
