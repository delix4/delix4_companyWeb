import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = "https://delix4.com";
    const routes = ["", "/careers", "/contact", "/projects"];

    return routes.map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
    }));
}
