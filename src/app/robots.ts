import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = "https://delix4.com";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
