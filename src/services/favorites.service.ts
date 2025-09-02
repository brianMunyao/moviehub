import { db } from "@/configs/db";
import { FavoritesTable, MoviesTable } from "@/configs/db/schema";
import { IMediaItem, IMediaType } from "@/types/IMediaItem";
import { eq, and } from "drizzle-orm";

const getFavorites = async (userId: string): Promise<IMediaItem[]> => {
  const results = await db
    .select({
      tmdb_id: MoviesTable.tmdb_id,
      media_type: MoviesTable.type,
      title: MoviesTable.title,
      overview: MoviesTable.overview,
      poster_path: MoviesTable.poster_path,
      backdrop_path: MoviesTable.backdrop_path,
      release_date: MoviesTable.release_date,
    })
    .from(FavoritesTable)
    .innerJoin(MoviesTable, eq(FavoritesTable.movie_id, MoviesTable.id))
    .where(eq(FavoritesTable.user_id, userId));

  return results.map((row) => ({
    id: row.tmdb_id,
    media_type: row.media_type === "show" ? "tv" : "movie",
    title: row.title,
    overview: row.overview || "",
    poster_path: row.poster_path || "",
    backdrop_path: row.backdrop_path || "",
    genre_ids: [],
    popularity: 0,
    vote_average: 0,
    vote_count: 0,
    release_date: row.release_date || undefined,
  }));
};

const getFavorite = async (
  userId: string,
  tmdbId: number,
  mediaType: IMediaType
): Promise<IMediaItem | null> => {
  const result = await db
    .select({
      tmdb_id: MoviesTable.tmdb_id,
      media_type: MoviesTable.type,
      title: MoviesTable.title,
      overview: MoviesTable.overview,
      poster_path: MoviesTable.poster_path,
      backdrop_path: MoviesTable.backdrop_path,
      release_date: MoviesTable.release_date,
    })
    .from(FavoritesTable)
    .innerJoin(MoviesTable, eq(FavoritesTable.movie_id, MoviesTable.id))
    .where(
      and(
        eq(FavoritesTable.user_id, userId),
        eq(MoviesTable.tmdb_id, tmdbId),
        eq(MoviesTable.type, mediaType === "tv" ? "show" : "movie")
      )
    )
    .limit(1);

  if (!result.length) return null;

  const row = result[0];
  return {
    id: row.tmdb_id,
    media_type: row.media_type === "show" ? "tv" : "movie",
    title: row.title,
    overview: row.overview || "",
    poster_path: row.poster_path || "",
    backdrop_path: row.backdrop_path || "",
    genre_ids: [],
    popularity: 0,
    vote_average: 0,
    vote_count: 0,
    release_date: row.release_date || undefined,
  };
};

const addFavorite = async (userId: string, media: IMediaItem) => {
  const [movie] = await db
    .insert(MoviesTable)
    .values({
      tmdb_id: media.id,
      type: media.media_type === "tv" ? "show" : "movie",
      title: media.title,
      overview: media.overview,
      poster_path: media.poster_path,
      backdrop_path: media.backdrop_path,
      release_date: media.release_date ?? media.first_air_date ?? null,
    })
    .onConflictDoNothing({
      target: [MoviesTable.tmdb_id, MoviesTable.type],
    })
    .returning();

  const movieId = movie?.id
    ? movie.id
    : (
        await db
          .select({ id: MoviesTable.id })
          .from(MoviesTable)
          .where(
            and(
              eq(MoviesTable.tmdb_id, media.id),
              eq(MoviesTable.type, media.media_type === "tv" ? "show" : "movie")
            )
          )
      )[0].id;

  await db
    .insert(FavoritesTable)
    .values({ user_id: userId, movie_id: movieId })
    .onConflictDoNothing();
};

const removeFavorite = async (userId: string, tmdbId: number, mediaType: IMediaType) => {
  const movie = await db
    .select({ id: MoviesTable.id })
    .from(MoviesTable)
    .where(
      and(
        eq(MoviesTable.tmdb_id, tmdbId),
        eq(MoviesTable.type, mediaType === "tv" ? "show" : "movie")
      )
    )
    .limit(1);

  if (!movie.length) return;

  await db
    .delete(FavoritesTable)
    .where(and(eq(FavoritesTable.user_id, userId), eq(FavoritesTable.movie_id, movie[0].id)));
};

const favoritesService = {
  getFavorites,
  getFavorite,
  addFavorite,
  removeFavorite,
};

export default favoritesService;
