import profileService from "../profile.service";
import { db } from "@/configs/db";
import { ProfilesTable } from "@/configs/db/schema";

jest.mock("@/configs/db", () => ({
  db: {
    insert: jest.fn(() => ({
      values: jest.fn(() => ({
        returning: jest.fn(),
      })),
    })),
    select: jest.fn(() => ({
      from: jest.fn(() => ({
        where: jest.fn(),
      })),
    })),
    update: jest.fn(() => ({
      set: jest.fn(() => ({
        where: jest.fn(() => ({
          returning: jest.fn(),
        })),
      })),
    })),
    delete: jest.fn(() => ({
      where: jest.fn(),
    })),
  },
}));

// Type helpers for convenience
const mockedDb = db as unknown as {
  insert: jest.Mock;
  select: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
};

describe("profileService", () => {
  const mockProfile = {
    id: "1",
    user_id: "user-1",
    email: "test@example.com",
    avatar_url: "http://example.com/avatar.png",
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createProfile inserts and returns profile", async () => {
    const returning = jest.fn().mockResolvedValue([mockProfile]);
    mockedDb.insert.mockReturnValue({
      values: jest.fn().mockReturnValue({ returning }),
    });

    const result = await profileService.createProfile({
      user_id: mockProfile.user_id,
      email: mockProfile.email,
      avatar_url: mockProfile.avatar_url,
    });

    expect(mockedDb.insert).toHaveBeenCalledWith(ProfilesTable);
    expect(result).toEqual(mockProfile);
  });

  it("getAllProfiles returns list", async () => {
    mockedDb.select.mockReturnValue({
      from: jest.fn().mockResolvedValue([mockProfile]),
    });

    const result = await profileService.getAllProfiles();
    expect(result).toEqual([mockProfile]);
  });

  it("getProfileById returns a single profile", async () => {
    mockedDb.select.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([mockProfile]),
      }),
    });

    const result = await profileService.getProfileById("1");
    expect(result).toEqual(mockProfile);
  });

  it("getProfileByUserId returns a single profile", async () => {
    mockedDb.select.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([mockProfile]),
      }),
    });

    const result = await profileService.getProfileByUserId("user-1");
    expect(result).toEqual(mockProfile);
  });

  it("updateProfile updates and returns profile", async () => {
    const returning = jest.fn().mockResolvedValue([mockProfile]);
    mockedDb.update.mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({ returning }),
      }),
    });

    const result = await profileService.updateProfile("user-1", {
      email: "new@example.com",
    });

    expect(result).toEqual(mockProfile);
  });

  it("deleteProfile deletes and returns true", async () => {
    mockedDb.delete.mockReturnValue({
      where: jest.fn().mockResolvedValue(true),
    });

    const result = await profileService.deleteProfile("user-1");
    expect(result).toBe(true);
  });

  it("createOrUpdate updates if profile exists", async () => {
    jest.spyOn(profileService, "getProfileByUserId").mockResolvedValue(mockProfile);
    jest.spyOn(profileService, "updateProfile").mockResolvedValue(mockProfile);

    const result = await profileService.createOrUpdate({
      user_id: "user-1",
      email: "new@example.com",
    });

    expect(profileService.updateProfile).toHaveBeenCalledWith("user-1", {
      email: "new@example.com",
      avatar_url: null,
    });
    expect(result).toEqual(mockProfile);
  });

  it("createOrUpdate creates if not exists", async () => {
    // Ensure "no profile found"
    //@ts-expect-error skip null issue
    jest.spyOn(profileService, "getProfileByUserId").mockResolvedValue(null);
    // Mock create
    jest.spyOn(profileService, "createProfile").mockResolvedValue(mockProfile);

    const result = await profileService.createOrUpdate({
      user_id: "user-1",
      email: "new@example.com",
    });

    expect(profileService.getProfileByUserId).toHaveBeenCalledWith("user-1");
    expect(profileService.createProfile).toHaveBeenCalledWith({
      user_id: "user-1",
      email: "new@example.com",
      avatar_url: null,
    });
    expect(result).toEqual(mockProfile);
  });
});
