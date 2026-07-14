import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/siteConfig";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const lastModified = new Date("2026-07-14");
  const changeFrequency = "monthly" as const;

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency,
      priority: 1,
    },
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified,
      changeFrequency,
      priority: 0.8,
    })),
    {
      url: `${base}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/personal-data-consent`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

