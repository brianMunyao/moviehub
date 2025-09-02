import { pgTable, uuid, text, timestamp, boolean, integer, unique } from "drizzle-orm/pg-core";

// ----------------- Profiles -----------------
export const ProfilesTable = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").notNull().unique(),
  email: text("email"),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// ----------------- Movies (TMDB cache) -----------------
export const MoviesTable = pgTable(
  "movies",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    tmdb_id: integer("tmdb_id").notNull(),
    type: text("type", { enum: ["movie", "show"] }).notNull(),

    title: text("title").notNull(),
    overview: text("overview"),
    poster_path: text("poster_path"),
    backdrop_path: text("backdrop_path"),
    release_date: text("release_date"),

    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    uniqueMovie: unique().on(table.tmdb_id, table.type),
  })
);

// ----------------- Favorites -----------------
export const FavoritesTable = pgTable("favorites", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: text("user_id")
    .notNull()
    .references(() => ProfilesTable.user_id, { onDelete: "cascade" }),

  movie_id: uuid("movie_id")
    .notNull()
    .references(() => MoviesTable.id, { onDelete: "cascade" }),

  created_at: timestamp("created_at").defaultNow(),
});

// ----------------- Watchlist -----------------
export const WatchlistTable = pgTable("watchlist", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: text("user_id")
    .notNull()
    .references(() => ProfilesTable.user_id, { onDelete: "cascade" }),

  movie_id: uuid("movie_id")
    .notNull()
    .references(() => MoviesTable.id, { onDelete: "cascade" }),

  is_watched: boolean("is_watched").default(false).notNull(),

  created_at: timestamp("created_at").defaultNow(),
});
