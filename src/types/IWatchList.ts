import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { WatchlistTable } from "@/configs/db/schema";

export type IWatchlist = InferSelectModel<typeof WatchlistTable>;
export type IWatchlistNew = InferInsertModel<typeof WatchlistTable>;
export type IWatchlistUpdate = Partial<IWatchlistNew>;
