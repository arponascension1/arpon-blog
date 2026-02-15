import { jsxs, jsx } from "react/jsx-runtime";
import { usePage, Head } from "@inertiajs/react";
function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogType = "website",
  twitterCard,
  image,
  canonical,
  robots,
  children,
  schema,
  breadcrumbs
}) {
  const { settings, url } = usePage().props;
  const pageUrl = usePage().url;
  const siteName = settings?.site_name || "Arpon Blog";
  const defaultDescription = settings?.site_description || settings?.app_description || "";
  const defaultKeywords = settings?.site_keywords || "";
  const defaultOgTitle = settings?.og_title || title || siteName;
  const defaultOgDescription = settings?.og_description || description || defaultDescription;
  const defaultTwitterCard = settings?.twitter_card || "summary_large_image";
  const siteUrl = window.location.origin;
  const fullCanonical = canonical || `${siteUrl}${pageUrl}`;
  const defaultOgImage = settings?.og_image || settings?.site_logo || "";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const isHomePage = pageUrl === "/" || pageUrl === "";
  const globalSchema = isHomePage ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": siteName,
        "description": defaultDescription,
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${siteUrl}/search?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": settings?.site_language || "en"
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": siteName,
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "inLanguage": settings?.site_language || "en",
          "@id": `${siteUrl}/#logo`,
          "url": settings?.site_logo || `${siteUrl}/favicon.ico`,
          "contentUrl": settings?.site_logo || `${siteUrl}/favicon.ico`,
          "width": 512,
          "height": 512,
          "caption": siteName
        },
        "image": {
          "@id": `${siteUrl}/#logo`
        }
      }
    ]
  } : null;
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      ...breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`
      }))
    ]
  } : null;
  return /* @__PURE__ */ jsxs(Head, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description || defaultDescription }),
    (keywords || defaultKeywords) && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords || defaultKeywords }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: fullCanonical }),
    robots && /* @__PURE__ */ jsx("meta", { name: "robots", content: robots }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: siteName }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: ogTitle || defaultOgTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: ogDescription || defaultOgDescription }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: fullCanonical }),
    (image || defaultOgImage) && /* @__PURE__ */ jsx("meta", { property: "og:image", content: image || defaultOgImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: twitterCard || defaultTwitterCard }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: ogTitle || defaultOgTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: ogDescription || defaultOgDescription }),
    (image || defaultOgImage) && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image || defaultOgImage }),
    globalSchema && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(globalSchema) }),
    schema && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    breadcrumbSchema && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) }),
    settings?.search_console_id && /* @__PURE__ */ jsx("meta", { name: "google-site-verification", content: settings.search_console_id }),
    settings?.google_analytics_id && /* @__PURE__ */ jsx("script", { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}` }),
    settings?.google_analytics_id && /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: {
      __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${settings.google_analytics_id}');
                    `
    } }),
    children
  ] });
}
export {
  SEO as S
};
