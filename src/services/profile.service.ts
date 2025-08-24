import { eq } from "drizzle-orm";

import { db } from "@/configs/db";
import { ProfilesTable } from "@/configs/db/schema";
import { IProfileNew, IProfileUpdate } from "@/types/IProfile";

const profileService = {
  async createProfile(data: IProfileNew) {
    const [profile] = await db
      .insert(ProfilesTable)
      .values({
        user_id: data.user_id,
        email: data?.email,
        avatar_url: data?.avatar_url,
      })
      .returning();
    return profile;
  },

  async getAllProfiles() {
    return db.select().from(ProfilesTable);
  },

  async getProfileById(id: string) {
    const [profile] = await db.select().from(ProfilesTable).where(eq(ProfilesTable.id, id));
    return profile;
  },

  async getProfileByUserId(userId: string) {
    const [profile] = await db
      .select()
      .from(ProfilesTable)
      .where(eq(ProfilesTable.user_id, userId));
    return profile;
  },

  async updateProfile(userId: string, updates: IProfileUpdate) {
    const [updated] = await db
      .update(ProfilesTable)
      .set({
        ...updates,
        updated_at: new Date(),
      })
      .where(eq(ProfilesTable.user_id, userId))
      .returning();
    return updated;
  },

  async deleteProfile(userId: string) {
    await db.delete(ProfilesTable).where(eq(ProfilesTable.user_id, userId));
    return true;
  },

  /**
   * Creates a profile if not exists, otherwise updates.
   * For OAuth/Google login flows.
   */
  async createOrUpdate(data: { user_id: string; email: string; avatar_url?: string | null }) {
    const existing = await profileService.getProfileByUserId(data.user_id);

    if (existing) {
      return profileService.updateProfile(data.user_id, {
        email: data.email,
        avatar_url: data.avatar_url ?? null,
      });
    }

    return profileService.createProfile({
      user_id: data.user_id,
      email: data.email,
      avatar_url: data.avatar_url ?? null,
    });
  },
};

export default profileService;
