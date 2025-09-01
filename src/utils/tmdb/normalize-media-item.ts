import { IMovie } from "@/types/IMovie";
import { ITVShow } from "@/types/ITVShow";
import { IMediaItem } from "@/types/IMediaItem";

export const normalizeMovie = (movie: IMovie): IMediaItem => {
  return {
    id: movie.id,
    media_type: "movie",
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genre_ids,
    popularity: movie.popularity,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    release_date: movie.release_date,
  };
};

export const normalizeTV = (tv: ITVShow): IMediaItem => {
  return {
    id: tv.id,
    media_type: "tv",
    title: tv.name,
    overview: tv.overview,
    poster_path: tv.poster_path,
    backdrop_path: tv.backdrop_path,
    genre_ids: tv.genre_ids,
    popularity: tv.popularity,
    vote_average: tv.vote_average,
    vote_count: tv.vote_count,
    first_air_date: tv.first_air_date,
  };
};
