import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { ProfilesTable } from "@/configs/db/schema";

export type IProfile = InferSelectModel<typeof ProfilesTable>;

export type IProfileNew = InferInsertModel<typeof ProfilesTable>;
// Fields needed to insert (id/created_at will be optional)

export type IProfileUpdate = Partial<IProfileNew>;
