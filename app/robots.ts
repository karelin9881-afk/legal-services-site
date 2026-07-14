import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

