/* eslint-disable @typescript-eslint/no-explicit-any */
import tvService from "@/services/tv.service";
import tmdbAxiosApiClient from "@/configs/tmdb/axios-client";
import { paginated_tv_shows } from "@/constants/mock-data/tv-shows";
import { normalizeTV } from "@/utils/tmdb/normalize-media-item";
import { AxiosResponse } from "axios";

jest.mock("@/configs/tmdb/axios-client");

const mockedAxios = tmdbAxiosApiClient as jest.Mocked<typeof tmdbAxiosApiClient>;

const createAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {} as any,
});

describe("tvService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the internal genre cache
    (tvService as any).tvGenreCache = null;
  });

  it("should fetch popular TV shows and normalize results", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(paginated_tv_shows));

    const response = await tvService.getPopular(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/tv/popular", { params: { page: 1 } });
    expect(response.results).toEqual(paginated_tv_shows.results.map(normalizeTV));
    expect(response.page).toBe(paginated_tv_shows.page);
  });

  it("should fetch TV details by id", async () => {
    const mockDetails = { id: 123, name: "Example TV Show" };
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockDetails));

    const result = await tvService.details(123);

    expect(mockedAxios.get).toHaveBeenCalledWith("/tv/123");
    expect(result).toEqual(mockDetails);
  });

  it("should return null for details if no data", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(null));

    const result = await tvService.details(999);

    expect(result).toBeNull();
  });

  it("should return cached TV genres", async () => {
    const mockGenres = { genres: [{ id: 1, name: "Drama" }] };
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockGenres));

    const genres1 = await tvService.genres();
    const genres2 = await tvService.genres();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(genres1).toEqual(mockGenres.genres);
    expect(genres2).toEqual(mockGenres.genres);
  });

  it("should search TV shows from mock data", async () => {
    const result = await tvService.search("test");

    expect(result.results).toEqual(paginated_tv_shows.results.map(normalizeTV));
    expect(result.page).toBe(paginated_tv_shows.page);
    expect(result.total_pages).toBe(paginated_tv_shows.total_pages);
    expect(result.total_results).toBe(paginated_tv_shows.total_results);
  });

  it("should fetch recommendations", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(paginated_tv_shows));

    const response = await tvService.getRecommendations(123);

    expect(mockedAxios.get).toHaveBeenCalledWith("/tv/123/recommendations", {
      params: { page: 1 },
    });
    expect(response.results).toEqual(paginated_tv_shows.results.map(normalizeTV));
  });

  it("should fetch top rated TV shows", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(paginated_tv_shows));

    const response = await tvService.getTopRated(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/tv/top_rated", { params: { page: 1 } });
    expect(response.results).toEqual(paginated_tv_shows.results.map(normalizeTV));
  });

  it("should fetch on the air TV shows", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(paginated_tv_shows));

    const response = await tvService.getOnTheAir(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/tv/on_the_air", { params: { page: 1 } });
    expect(response.results).toEqual(paginated_tv_shows.results.map(normalizeTV));
  });

  it("should fetch airing today TV shows", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(paginated_tv_shows));

    const response = await tvService.getAiringToday(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/tv/airing_today", { params: { page: 1 } });
    expect(response.results).toEqual(paginated_tv_shows.results.map(normalizeTV));
  });

  it("should fetch similar TV shows", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(paginated_tv_shows));

    const response = await tvService.getSimilar(123);

    expect(mockedAxios.get).toHaveBeenCalledWith("/tv/123/similar", { params: { page: 1 } });
    expect(response.results).toEqual(paginated_tv_shows.results.map(normalizeTV));
  });

  it("should discover TV shows with query options", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(paginated_tv_shows));

    const queryOptions = { with_genres: "28", sort_by: "popularity.desc" };
    const response = await tvService.discover(queryOptions, 1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/discover/tv", {
      params: { page: 1, ...queryOptions },
    });
    expect(response.results).toEqual(paginated_tv_shows.results.map(normalizeTV));
  });
});
