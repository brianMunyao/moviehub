import { paginated_tv_shows, tv_shows } from "@/constants/mock-data/tv-shows";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { ITVQueryOptions } from "@/types/ITVShow";
import { IMediaItem } from "@/types/IMediaItem";
import axios from "axios";
import { normalizeTV } from "@/utils/tmdb/normalize-media-item";

const TMDB_API_KEY = process.env.TMDB_API_KEY!;
if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY is required");

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY },
});

let tvGenreCache: { id: number; name: string }[] | null = null;
async function getTVGenresCached() {
  if (tvGenreCache) return tvGenreCache;
  const { data } = await api.get("/genre/tv/list");
  tvGenreCache = data.genres;
  return tvGenreCache || [];
}

export const tvService = {
  async getPopular(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await api.get(`/tv/popular`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getTopRated(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await api.get(`/tv/top_rated`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getOnTheAir(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await api.get(`/tv/on_the_air`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getAiringToday(page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await api.get(`/tv/airing_today`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getRecommendations(tvId: number, page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await api.get(`/tv/${tvId}/recommendations`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async getSimilar(tvId: number, page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await api.get(`/tv/${tvId}/similar`, { params: { page } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  async discover(params: ITVQueryOptions = {}, page = 1): Promise<IPaginatedResponse<IMediaItem>> {
    const { data } = await api.get(`/discover/tv`, { params: { page, ...params } });
    return { ...data, results: data.results.map(normalizeTV) };
  },

  // async discover(options?: ITVQueryOptions): Promise<IPaginatedResponse<IMediaItem>> {
  //   // const { data } = await api.get("/discover/tv", { params: options });
  //   const data = paginated_tv_shows;

  //   return {
  //     results: data.results.map(normalizeTV),
  //     page: data.page,
  //     total_pages: data.total_pages,
  //     total_results: data.total_results,
  //   };
  // },

  async search(
    query: string,
    options?: Partial<ITVQueryOptions>
  ): Promise<IPaginatedResponse<IMediaItem>> {
    // const { data } = await api.get("/search/tv", {
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

  async details(id: number): Promise<IMediaItem> {
    // const { data } = await api.get(`/tv/${id}`);
    const tv = tv_shows.find((t) => t.id === id) || tv_shows[0];
    return normalizeTV(tv);
  },

  async genres(): Promise<{ id: number; name: string }[]> {
    return await getTVGenresCached();
  },
};

export default tvService;
