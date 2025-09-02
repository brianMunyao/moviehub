import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moviehub-savannah.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/movies/", "/tv/", "/search/"],
      disallow: ["/api/", "/(restricted)/", "/sign-in/", "/sign-up/", "/_next/", "/static/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
