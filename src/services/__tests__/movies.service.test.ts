/* eslint-disable @typescript-eslint/no-explicit-any */

import moviesService from "@/services/movies.service";
import tmdbAxiosApiClient from "@/configs/tmdb/axios-client";
import { IMediaItem } from "@/types/IMediaItem";
import { IMovieDetail, IMovieQueryOptions } from "@/types/IMovie";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { movie_detail } from "@/constants/mock-data/movies";

jest.mock("@/configs/tmdb/axios-client");

const mockedAxios = tmdbAxiosApiClient as jest.Mocked<typeof tmdbAxiosApiClient>;

const createAxiosResponse = <T>(data: T) => ({
  data,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {} as any,
});

const mockPaginatedMovies: IPaginatedResponse<IMediaItem> = {
  results: [
    { id: 1, title: "Movie 1", media_type: "movie" } as IMediaItem,
    { id: 2, title: "Movie 2", media_type: "movie" } as IMediaItem,
  ],
  page: 1,
  total_pages: 1,
  total_results: 2,
};

describe("moviesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset internal genre cache
    (moviesService as any).genreCache = null;
  });

  it("should fetch popular movies and normalize results", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockPaginatedMovies));

    const response = await moviesService.getPopular(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/movie/popular", { params: { page: 1 } });
    expect(response.results).toEqual(mockPaginatedMovies.results);
    expect(response.page).toBe(mockPaginatedMovies.page);
  });

  it("should fetch movie details by id", async () => {
    const mockDetails: IMovieDetail = movie_detail;
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockDetails));

    const result = await moviesService.details(123);

    expect(mockedAxios.get).toHaveBeenCalledWith("/movie/123");
    expect(result).toEqual(mockDetails);
  });

  it("should return null if details API returns no data", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(null));

    const result = await moviesService.details(999);
    expect(result).toBeNull();
  });

  it("should fetch movie genres and cache them", async () => {
    const mockGenres = { genres: [{ id: 1, name: "Action" }] };
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockGenres));

    const genres1 = await moviesService.genres();
    const genres2 = await moviesService.genres();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(genres1).toEqual(mockGenres.genres);
    expect(genres2).toEqual(mockGenres.genres);
  });

  it("should fetch top rated movies", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockPaginatedMovies));

    const response = await moviesService.getTopRated(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/movie/top_rated", { params: { page: 1 } });
    expect(response.results).toEqual(mockPaginatedMovies.results);
  });

  it("should fetch now playing movies", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockPaginatedMovies));

    const response = await moviesService.getNowPlaying(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/movie/now_playing", { params: { page: 1 } });
    expect(response.results).toEqual(mockPaginatedMovies.results);
  });

  it("should fetch upcoming movies", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockPaginatedMovies));

    const response = await moviesService.getUpcoming(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/movie/upcoming", { params: { page: 1 } });
    expect(response.results).toEqual(mockPaginatedMovies.results);
  });

  it("should fetch recommendations", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockPaginatedMovies));

    const response = await moviesService.getRecommendations(123);

    expect(mockedAxios.get).toHaveBeenCalledWith("/movie/123/recommendations", {
      params: { page: 1 },
    });
    expect(response.results).toEqual(mockPaginatedMovies.results);
  });

  it("should fetch similar movies", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockPaginatedMovies));

    const response = await moviesService.getSimilar(123);

    expect(mockedAxios.get).toHaveBeenCalledWith("/movie/123/similar", { params: { page: 1 } });
    expect(response.results).toEqual(mockPaginatedMovies.results);
  });

  it("should discover movies with query options", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockPaginatedMovies));

    const queryOptions: IMovieQueryOptions = { with_genres: "28" };
    const response = await moviesService.discover(queryOptions, 1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/discover/movie", {
      params: { page: 1, ...queryOptions },
    });
    expect(response.results).toEqual(mockPaginatedMovies.results);
  });

  it("should search movies", async () => {
    mockedAxios.get.mockResolvedValueOnce(createAxiosResponse(mockPaginatedMovies));

    const response = await moviesService.search("test");

    expect(mockedAxios.get).toHaveBeenCalledWith("/search/movie", { params: { query: "test" } });
    expect(response.results).toEqual(mockPaginatedMovies.results);
  });
});
