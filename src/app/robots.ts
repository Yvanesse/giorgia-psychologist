import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://giorgiapetruzzellis.it";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/area-riservata", "/api/admin"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
