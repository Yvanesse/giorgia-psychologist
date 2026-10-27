import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/area-riservata", "/api/admin"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
