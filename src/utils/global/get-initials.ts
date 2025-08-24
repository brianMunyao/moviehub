/**
 * Returns the initials for a given name or email.
 */
export const getInitials = (input: string | undefined | null): string => {
  if (!input) return "--";

  // If it's an email, remove domain part
  const namePart = input.includes("@") ? input.split("@")[0] : input;

  // Replace separators with space
  const clean = namePart.replace(/[\.\_\-]+/g, " ").trim();

  if (!clean) return "--";

  const parts = clean.split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
