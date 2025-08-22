import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { FavoritesTable } from "@/configs/db/schema";

export type IFavorite = InferSelectModel<typeof FavoritesTable>;
export type IFavoriteNew = InferInsertModel<typeof FavoritesTable>;
export type IFavoriteUpdate = Partial<IFavoriteNew>;
