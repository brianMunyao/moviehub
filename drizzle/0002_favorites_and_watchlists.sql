CREATE TABLE "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" integer NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"overview" text,
	"poster_path" text,
	"backdrop_path" text,
	"release_date" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "movies_tmdb_id_type_unique" UNIQUE("tmdb_id","type")
);
--> statement-breakpoint
ALTER TABLE "favorites" ALTER COLUMN "movie_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "watchlist" ALTER COLUMN "movie_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" DROP COLUMN "movie_title";--> statement-breakpoint
ALTER TABLE "favorites" DROP COLUMN "movie_type";--> statement-breakpoint
ALTER TABLE "watchlist" DROP COLUMN "movie_type";