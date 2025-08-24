/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfilesTable } from "@/configs/db/schema";
import profileService from "@/services/profile.service";
import { db } from "@/configs/db";

type MockedFn = jest.Mock<any, any>;

// Create reusable builders for each query type
const insertBuilder = {
  values: jest.fn().mockReturnThis(),
  returning: jest.fn(),
};
const selectBuilder = {
  from: jest.fn().mockReturnThis(),
  where: jest.fn(),
};
const updateBuilder = {
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  returning: jest.fn(),
};
const deleteBuilder = {
  where: jest.fn(),
};

jest.mock("@/configs/db", () => ({
  db: {
    insert: jest.fn((_table) => insertBuilder),
    select: jest.fn(() => selectBuilder),
    update: jest.fn((_table) => updateBuilder),
    delete: jest.fn((_table) => deleteBuilder),
  },
}));

describe("profileService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a profile", async () => {
    (insertBuilder.returning as MockedFn).mockResolvedValueOnce([
      { id: "1", user_id: "u1", email: "test@example.com" },
    ]);

    const result = await profileService.createProfile({
      user_id: "u1",
      email: "test@example.com",
    });

    expect(db.insert).toHaveBeenCalledWith(ProfilesTable);
    expect(result.email).toBe("test@example.com");
  });

  it("should get a profile by userId", async () => {
    (selectBuilder.where as MockedFn).mockResolvedValueOnce([
      { id: "1", user_id: "u1", email: "test@example.com" },
    ]);

    const result = await profileService.getProfileByUserId("u1");
    expect(result?.user_id).toBe("u1");
  });

  it("should update a profile", async () => {
    (updateBuilder.returning as MockedFn).mockResolvedValueOnce([
      { id: "1", user_id: "u1", email: "updated@example.com" },
    ]);

    const result = await profileService.updateProfile("u1", {
      email: "updated@example.com",
    });

    expect(db.update).toHaveBeenCalledWith(ProfilesTable);
    expect(result?.email).toBe("updated@example.com");
  });

  it("should delete a profile", async () => {
    const result = await profileService.deleteProfile("u1");
    expect(db.delete).toHaveBeenCalledWith(ProfilesTable);
    expect(result).toBe(true);
  });

  it("should createOrUpdate - creates new if not exists", async () => {
    (selectBuilder.where as MockedFn).mockResolvedValueOnce([]); // No existing
    (insertBuilder.returning as MockedFn).mockResolvedValueOnce([
      { id: "1", user_id: "u1", email: "new@example.com" },
    ]);

    const result = await profileService.createOrUpdate({
      user_id: "u1",
      email: "new@example.com",
    });

    expect(result?.email).toBe("new@example.com");
  });

  it("should createOrUpdate - updates if exists", async () => {
    (selectBuilder.where as MockedFn).mockResolvedValueOnce([
      { id: "1", user_id: "u1", email: "old@example.com" },
    ]);
    (updateBuilder.returning as MockedFn).mockResolvedValueOnce([
      { id: "1", user_id: "u1", email: "updated@example.com" },
    ]);

    const result = await profileService.createOrUpdate({
      user_id: "u1",
      email: "updated@example.com",
    });

    expect(result?.email).toBe("updated@example.com");
  });
});
