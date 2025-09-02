/* eslint-disable @typescript-eslint/no-explicit-any */
import recommendationService from "@/services/recommendation.service";
import moviesService from "@/services/movies.service";
import tvService from "@/services/tv.service";
import tmdbAxiosApiClient from "@/configs/tmdb/axios-client";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { IMediaItem } from "@/types/IMediaItem";
import { normalizeMovie, normalizeTV } from "@/utils/tmdb/normalize-media-item";
import { paginated_movies } from "@/constants/mock-data/movies";
import { paginated_tv_shows } from "@/constants/mock-data/tv-shows";
import { IMovie } from "@/types/IMovie";
import { ITVShow } from "@/types/ITVShow";

jest.mock("@/services/movies.service");
jest.mock("@/services/tv.service");
jest.mock("@/configs/tmdb/axios-client");

const mockedMoviesService = moviesService as jest.Mocked<typeof moviesService>;
const mockedTvService = tvService as jest.Mocked<typeof tvService>;
const mockedAxios = tmdbAxiosApiClient as jest.Mocked<typeof tmdbAxiosApiClient>;

const mockPaginatedItems: IPaginatedResponse<IMediaItem> = {
  results: [
    normalizeMovie(paginated_movies.results[0]),
    normalizeMovie(paginated_movies.results[1]),
  ],
  page: 1,
  total_pages: 1,
  total_results: 2,
};

const createAxiosResponse = <T>(data: T) => ({
  data,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {} as any,
});

describe("recommendationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call moviesService.getRecommendations for movie type", async () => {
    mockedMoviesService.getRecommendations.mockResolvedValue(mockPaginatedItems);

    const response = await recommendationService.getRecommendations("movie", 123);

    expect(mockedMoviesService.getRecommendations).toHaveBeenCalledWith(123, 1);
    expect(response).toEqual(mockPaginatedItems);
  });

  it("should call tvService.getRecommendations for tv type", async () => {
    mockedTvService.getRecommendations.mockResolvedValue(mockPaginatedItems);

    const response = await recommendationService.getRecommendations("tv", 456);

    expect(mockedTvService.getRecommendations).toHaveBeenCalledWith(456, 1);
    expect(response).toEqual(mockPaginatedItems);
  });

  it("should call moviesService.getSimilar for movie type", async () => {
    mockedMoviesService.getSimilar.mockResolvedValue(mockPaginatedItems);

    const response = await recommendationService.getSimilar("movie", 123);

    expect(mockedMoviesService.getSimilar).toHaveBeenCalledWith(123, 1);
    expect(response).toEqual(mockPaginatedItems);
  });

  it("should call tvService.getSimilar for tv type", async () => {
    mockedTvService.getSimilar.mockResolvedValue(mockPaginatedItems);

    const response = await recommendationService.getSimilar("tv", 456);

    expect(mockedTvService.getSimilar).toHaveBeenCalledWith(456, 1);
    expect(response).toEqual(mockPaginatedItems);
  });

  it("should call moviesService.discover for movie type", async () => {
    mockedMoviesService.discover.mockResolvedValue(mockPaginatedItems);

    const response = await recommendationService.discover("movie", { with_genres: "28" });

    expect(mockedMoviesService.discover).toHaveBeenCalledWith({ with_genres: "28" }, 1);
    expect(response).toEqual(mockPaginatedItems);
  });

  it("should call tvService.discover for tv type", async () => {
    mockedTvService.discover.mockResolvedValue(mockPaginatedItems);

    const response = await recommendationService.discover("tv", { with_genres: "18" });

    expect(mockedTvService.discover).toHaveBeenCalledWith({ with_genres: "18" }, 1);
    expect(response).toEqual(mockPaginatedItems);
  });

  it("should searchAll and normalize results", async () => {
    const rawList = {
      results: [
        { ...paginated_movies.results[0], media_type: "movie" },
        { ...paginated_tv_shows.results[1], media_type: "tv" },
      ],
      page: 1,
      total_pages: 1,
      total_results: 2,
    };

    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(rawList));

    const response = await recommendationService.searchAll("query");

    expect(mockedAxios.get).toHaveBeenCalledWith("/search/multi", { params: { query: "query" } });
    expect(response.results.map((item) => item.title)).toEqual([
      normalizeMovie(rawList.results[0] as IMovie).title,
      normalizeTV(rawList.results[1] as ITVShow).title,
    ]);
  });

  it("should get trending items and normalize results", async () => {
    const rawList = {
      results: [
        { ...paginated_movies.results[0], media_type: "movie" },
        { ...paginated_tv_shows.results[1], media_type: "tv" },
      ],
      page: 1,
      total_pages: 1,
      total_results: 2,
    };

    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(rawList));

    const response = await recommendationService.trending("all", "day");

    expect(mockedAxios.get).toHaveBeenCalledWith("/trending/all/day", { params: { page: 1 } });
    expect(response.results.map((item) => item.title)).toEqual([
      normalizeMovie(rawList.results[0] as IMovie).title,
      normalizeTV(rawList.results[1] as ITVShow).title,
    ]);
  });
});
