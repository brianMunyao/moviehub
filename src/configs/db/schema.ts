import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

// ----------------- Profiles -----------------
export const ProfilesTable = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").notNull().unique(),
  username: text("username"),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// ----------------- Favorites -----------------
export const FavoritesTable = pgTable("favorites", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => ProfilesTable.user_id, { onDelete: "cascade" }),
  movie_id: text("movie_id").notNull(),
  movie_title: text("movie_title").notNull(),
  movie_type: text("movie_type", { enum: ["movie", "show"] }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// ----------------- Watchlist -----------------
export const WatchlistTable = pgTable("watchlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => ProfilesTable.user_id, { onDelete: "cascade" }),
  movie_id: text("movie_id").notNull(),
  movie_type: text("movie_type", { enum: ["movie", "show"] }).notNull(),
  is_watched: boolean("is_watched").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
