import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MovieHub",
    short_name: "MovieHub",
    description: "Your ultimate destination for movies and TV shows",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/logo-with-text.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["entertainment", "movies", "tv"],
    shortcuts: [
      //   {
      //     name: "Movies",
      //     url: "/movies",
      //     description: "Browse movies",
      //   },
      //   {
      //     name: "TV Shows",
      //     url: "/tv",
      //     description: "Browse TV shows",
      //   },
      {
        name: "Search",
        url: "/search",
        description: "Search for content",
      },
    ],
    orientation: "any",
    prefer_related_applications: false,
  };
}
