import { getInitials } from "@/utils/global/get-initials";

describe("getInitials", () => {
  it("returns initials for a full name", () => {
    expect(getInitials("Mary Jane Watson-Parker")).toBe("MW");
  });

  it("returns first two letters for a single name", () => {
    expect(getInitials("Brian")).toBe("BR");
    expect(getInitials("john")).toBe("JO");
  });

  it("returns initials from an email", () => {
    expect(getInitials("john.doe@example.com")).toBe("JD");
    expect(getInitials("alice@example.com")).toBe("AL");
  });

  it("handles underscores, dashes, and dots", () => {
    expect(getInitials("john_doe-smith")).toBe("JS");
  });

  it("returns '--' for empty or undefined", () => {
    expect(getInitials("")).toBe("--");
    expect(getInitials(undefined)).toBe("--");
    expect(getInitials(null)).toBe("--");
  });

  it("trims whitespace and normalizes input", () => {
    expect(getInitials("  john.doe  ")).toBe("JD");
  });
});
