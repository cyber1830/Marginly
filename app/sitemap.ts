import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://marginly.example";
  return [
    "/",
    "/book",
    "/pricing",
    "/login",
    "/onboarding",
    "/dashboard",
    "/menu",
    "/agent",
    "/storefront",
    "/team",
    "/settings",
    "/reports",
    "/marketing",
    "/visuals",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
