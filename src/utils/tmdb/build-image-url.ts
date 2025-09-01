// Utility to build full image URLs
export const buildImageUrl = (path: string | null, size: "w200" | "w500" | "original" = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
