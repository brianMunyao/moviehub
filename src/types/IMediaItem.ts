export type IMediaType = "movie" | "tv";

// Shared type for displaying movies + tv shows together
export type IMediaItem = {
  id: number;
  media_type: IMediaType; // TMDB returns this sometimes, but we enforce it
  title: string; // For TV shows, map `name` here
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date?: string; // Movie-specific
  first_air_date?: string; // TV-specific
};
